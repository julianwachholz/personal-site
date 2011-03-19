<?php

$fn = realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..').DIRECTORY_SEPARATOR.'404.log';
if(basename(__FILE__) != basename($_SERVER['REQUEST_URI'])) {
  file_put_contents($fn, date('r')." > Requested “$_SERVER[REQUEST_URI]” (Referer: $_SERVER[HTTP_REFERER])\r\n", FILE_APPEND);
}

?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge,chrome=1">

  <title>Heck, there's no file</title>
  <meta name="robots" content="noindex,nofollow">
  <meta name="language" content="en">

  <!--<link rel="shortcut icon" href="style/icon/favicon.ico">-->
  <link rel="stylesheet" href="http://<?php echo $_SERVER['SERVER_NAME'] ?>/design/style.css" type="text/css">

  <!--[if lt IE 9]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
</head>
<body id="e404">
  <article>
    <header>
      <h1>Heck, where's that file?</h1>
    </header>

    <section>
      <p>
        Sorry, there's no “<?php echo basename($_SERVER['REQUEST_URI']) ?>” here, try looking elsewhere.
      </p>
      <p>
        You may want to proceed to <a href="/">my homepage</a> instead.
      </p>
    </section>
  </article>

  <footer>
    <em>Yes, that's a 404.</em>
    <a href="/" onclick="javascript:history.go(-1)">Go back</a>
  </footer>
</body>
</html>
