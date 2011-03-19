<?php defined('FILE_VIEWER') or exit;


/**
 * Return a file's size in a human readable way
 *
 * @param string $fileName The name of a file
 *
 * @return string
 */
function fsize( $fileName ) {
    if(!is_file($fileName)) {
        return false;
    }

    $units = filesize($fileName);
    $unit = 'B';

    if($units > pow(1024,3)) {
        $unit = 'GB';
        $units = round($units/pow(1024,3), 2);
    }
    elseif($units > pow(1024,2)) {
        $unit = 'MB';
        $units = round($units/pow(1024,2), 2);
    }
    elseif($units > 1024) {
        $unit = 'KB';
        $units = floor($units/1024);
    }

    // defaults to bytes

    return $units . ' ' . $unit;
}


/**
 * Return a relative time to a date in the past
 *
 * @param int $tm  Timestamp
 * @param int $rcs not used
 *
 * @return string    e.g. '20 minutes ', add 'ago' and you'll have a nice string
 */
function time_ago($tm,$rcs = 0) {
   $cur_tm = time(); $dif = $cur_tm-$tm;
   $pds = array('second','minute','hour','day','week','month','year');
   $lngh = array(1,60,3600,86400,604800,2630880,31570560);
   for($v = sizeof($lngh)-1; ($v >= 0)&&(($no = $dif/$lngh[$v])<=1); $v--); if($v < 0) $v = 0; $_tm = $cur_tm-($dif%$lngh[$v]);

   $no = floor($no); if($no <> 1) $pds[$v] .='s'; $x=sprintf("%d %s ",$no,$pds[$v]);
   if(($rcs == 1)&&($v >= 1)&&(($cur_tm-$_tm) > 0)) $x .= time_ago($_tm);
   return $x;
}


/**
 * Truncate a string to the given length and append a marker
 *
 * @param string $str    The string to be truncated
 * @param int $len    The max length it should have
 * @param string $append The string to be appended if it gets truncated
 *
 * @return string    The truncated or untouched string if it's shorter than $len
 */
function str_truncate($str, $len = 20, $append = '…') {
  if(strlen($str) > $len) {
    return substr($str, 0, $len - strlen($append)) . $append;
  }
  return $str;
}


/**
 * Render a simple PHP template
 *
 * @param string $template  The filename of the template
 * @param array $variables Template variables
 *
 * @return bool Success?
 */
function render($_template, $_variables) {
    if(!is_file($_template)) {
        return false;
    }

    extract($_variables);
    include($_template);

    return true;
}
