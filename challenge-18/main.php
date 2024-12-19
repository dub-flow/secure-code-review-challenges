<?php
session_start();

class User {
    public $username;
    public $role;
    
    public function __construct($username, $role) {
        $this->username = $username;
        $this->role = $role;
    }
    
    public function __toString() {
        return "User: $this->username, Role: $this->role";
    }
}

function isAdmin() {
    if (isset($_SESSION['user']) && $_SESSION['user'] instanceof User) {
        return $_SESSION['user']->role === 'admin';
    }
    return false;
}

if (isset($_POST['submit'])) {
    $data = $_POST['data'];
    $user = @unserialize($data);
    if ($user === false && $data !== 'b:0;') {
        echo "Failed to unserialize user. ";
    } else {
        $_SESSION['user'] = $user;
    }
}

if (isAdmin()) {
    echo "Welcome to the admin page!";
} else {
    if (isset($_SESSION['user'])) {
        if ($_SESSION['user'] instanceof User) {
            echo 'Hello ' . $_SESSION['user'];
        } else {
            echo 'Hello, invalid user data!';
        }
    } else {
        echo "You need to log in to access this page.";
    }
}
?>

<form method="post">
    <input type="text" name="data" placeholder="Serialized data">
    <button type="submit" name="submit">Submit</button>
</form>
