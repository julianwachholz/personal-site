<?php defined('FILE_VIEWER') or exit ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title><?php echo $filename ?></title>
  <style>
    @import '<?php echo ASSETS_URL ?>style.css';<?php if($type == 'image'): ?>

    .image {
      width: <?php echo $display_width ?>px; margin-left: -<?php echo round($display_width/2) ?>px;
      height: <?php echo $display_height ?>px; margin-top: -<?php echo round($display_height/2) ?>px;
    }
    .info {
      margin-top: <?php echo round($display_height/2)+32 ?>px;
    }<?php endif; ?>

  </style>
</head>
<body>
<?php if($type == 'image'): ?>
  <div class="image">
    <a href="<?php echo FILE_URL ?>?download" title="Download this image" onclick="trackDownload()">
      <img src="<?php echo FILE_URL ?>?download" alt="<?php echo $filename ?>"<?php echo $imgattr ?> />
    </a>
  </div>

  <div class="info"><?php if($imgattr): ?>

    <p>click image to enlarge</p><?php endif; ?>

    <p>size: <?php echo $size ?> – resolution: <?php echo $width.'×'.$height ?> pixel – uploaded <?php echo $date ?></p>
  </div>
<?php else: ?>
  <div class="file">
    <div class="greenbutton">
      <a href="<?php echo FILE_URL ?>?download" title="Download <?php echo $filename_short ?> (<?php echo $type ?>, <?php echo $size ?>)" class="green" onclick="trackDownload()">
        <?php if($icon): ?><img src="<?php echo ASSETS_URL . $icon ?>" alt="<?php echo $type ?>" /><?php endif; ?>

        Download
      </a>
    </div>

    <p><strong title="<?php echo $filename ?>"><?php echo $filename_short ?></strong> (<?php echo $size ?>)</p>
    <p class="time">uploaded <?php echo $date ?></p>
  </div>
<?php endif; ?>

  <script>
  var _gaq = [['_setAccount', 'UA-16722648-1'], ['_trackPageview']];
  (function(d, t) {
    var g = d.createElement(t),
    s = d.getElementsByTagName(t)[0];
    g.async = true;
    g.src = ('https:' == location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g, s);
  })(document, 'script');
  function trackDownload() {
    _gaq.push(['_trackEvent', 'Downloads', '<?php echo $filepath ?>', '<?php echo $filename ?>']);
  }
  </script>
</body>
</html>
