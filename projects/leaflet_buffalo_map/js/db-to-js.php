var array = [
    <?php
        $servername = $_ENV["MYSQL_HOST"];
        $username = $_ENV["MYSQL_USER"];
        $password = $_ENV["MYSQL_PASSWORD"];
        $dbname = $_ENV["MYSQL_DB"];

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT `lat`,`lon`,`sale_price`,`address`,`PROP_DESC`,`YEAR` FROM `housing_sales` WHERE `YEAR` > 2010";
        $result = $conn->query($sql);
        // echo "connection failed";
        // echo "'$result->num_rows'";
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $address = $row["address"];
                $lat = $row["lat"];
                $lon = $row["lon"];
                $sale_price = $row["sale_price"];
                $prop_desc = $row["PROP_DESC"];
                $year_sold = $row["YEAR"];
                echo "['$address',['$lat','$lon'],'$sale_price','$prop_desc','$year_sold'],";
                // echo '<script>mydata["address"].push('. $row["address"] .'); </script>';
                
            }
            } else {
            echo "0 results";
            }

        
        $conn->close();
    ?>
];


