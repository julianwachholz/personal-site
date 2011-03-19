<?php

defined('__DIR__') || define('__DIR__', dirname(__FILE__) . DIRECTORY_SEPARATOR);

define('FILE_VIEWER', true);
define('LIB_PATH', __DIR__ . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR);

define('BASE_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/uploads/');
define('ASSETS_URL', BASE_URL . 'assets/');

define('FILE_URL', 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
define('FILE_PATH', dirname(__DIR__) . str_replace('/', DIRECTORY_SEPARATOR, urldecode($_SERVER['REQUEST_URI'])));

define('IMAGE_MAX_HEIGHT', 800);
define('IMAGE_MAX_WIDTH', 1000);
define('FILE_MAX_LENGTH',   20);

if(!is_file(FILE_PATH)) {
    header('HTTP/1.1 500 Internal Server Error', true, 500);
    die('Fatal error.');
}

error_reporting(0);

require LIB_PATH . 'functions.php';

/** @var array Template variables **/
$variables = array();

$extension = substr(FILE_PATH, strrpos(FILE_PATH, '.') + 1); // without the dot
$extensionInfo = parse_ini_file(LIB_PATH . 'extensions.ini', true);

$variables['icon'] = empty($extensionInfo['icons'][$extension]) ? false : $extensionInfo['icons'][$extension];
$variables['type'] = empty($extensionInfo['types'][$extension]) ? 'File' : $extensionInfo['types'][$extension];

$variables['filename'] = basename(FILE_PATH);
$variables['filepath'] = dirname($_SERVER['REQUEST_URI']);
$variables['filename_short'] = str_truncate(basename(FILE_PATH), FILE_MAX_LENGTH, '...' . $extension);
$variables['size'] = fsize(FILE_PATH);

$timeModified = filectime(FILE_PATH);
$variables['date'] = time() - $timeModified > 31570560 ? // more than one year ago?
                        'on ' . date('l, F j, Y', $timeModified)
                        : time_ago($timeModified) . 'ago';

switch($extension) {
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
        $imagesize = getimagesize(FILE_PATH);
        $resizeHeight = 0;
        $resizeWidth  = 0;

        $variables['type'] = 'image';
        $variables['imgattr'] = false;
        $variables['width']  = $variables['display_width']  = $imagesize[0];
        $variables['height'] = $variables['display_height'] = $imagesize[1];

        if($imagesize[0] > IMAGE_MAX_WIDTH) {
            // image too wide
            $resizeHeight = round($imagesize[1] * (IMAGE_MAX_WIDTH * 100 / $imagesize[0]) / 100);
            $resizeWidth = IMAGE_MAX_WIDTH;
        }

        if($imagesize[1] > IMAGE_MAX_HEIGHT || $resizeHeight > IMAGE_MAX_HEIGHT) {
            // image too high
            $resizeWidth = round($imagesize[0] * (IMAGE_MAX_HEIGHT * 100 / $imagesize[1]) / 100);
            $resizeHeight = IMAGE_MAX_HEIGHT;
        }

        if($resizeHeight > 0 || $resizeWidth > 0) {
            $variables['display_width']  = $resizeWidth;
            $variables['display_height'] = $resizeHeight;
            $variables['imgattr'] = ' width="'. $resizeWidth .'" height="'. $resizeHeight .'"';
        }
        break;
    default:
        // nothing?
        break;
}

render(LIB_PATH . 'template.php', $variables);
