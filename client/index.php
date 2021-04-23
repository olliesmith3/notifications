<html>
<head>
<title>Contour Notifications</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<style>
  <?php include "index.css" ?>
</style>
</head>

<body>
<script src="index.js"></script>
<div id="main">
<div id="mySidenav" class="sidenav">
  <a class="closebtn" onclick="closeNav()" >&times;</a>
  <a onclick="openNotifications()" id="notification-menu-item">Notifications<span id="notification-count" style="color: red;"></span></a>
  <a onclick="openForms()">Forms</a>
  <a onclick="openSettings()">Settings</a>
</div>
<span onclick="openNav()">Menu</span>

<span id="app"></span>
</body>
</html>
