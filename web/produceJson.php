<?php
    function rec_listFiles( $from = '.')
    {
        if(! is_dir($from))
			return false;

        $files = array();
        if( $dh = opendir($from))
        {
            while( false !== ($file = readdir($dh)))
            {
				//echo "$file<br/>";

                // Skip '.' and '..'
                if( $file == '.' || $file == '..')
					continue;
                $path = $from . '/' . $file;
                if( is_dir($path) )
					$files += rec_listFiles($path);
                else
					$files[] = $path;
            }
            closedir($dh);
        }
        return $files;
    }
?>

<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="lib/googleMaps.css">
    <script src="https://maps.googleapis.com/maps/api/js"></script>
	
	<script type="text/javascript" src="lib/exif.js"></script>

	<script type="text/javascript" src="js/sm.namespaces.js"></script>
    <script type="text/javascript" src="js/sm.readEXIFdata.js"></script>
    <script type="text/javascript" src="js/sm.googleMaps.js"></script>
    <script type="text/javascript" src="js/sm.visualize.js"></script>
    <script type="text/javascript" src="js/start.js"></script>

  </head>
  <body>
    <div id="map-canvas"></div>
    Listing:
        <?php
            $myFiles = rec_listFiles( "C:/myProjects/js/myPhotoAlbum/web/slike" );
            echo "Key: ".$myFiles[0]."<p/>";
            echo "Json: ".json_encode ($myFiles, JSON_UNESCAPED_SLASHES);
            $fp = fopen('files.json', 'w');
            fwrite($fp, json_encode ($myFiles, JSON_UNESCAPED_SLASHES));
            fclose($fp);
        ?>
  </body>
</html>