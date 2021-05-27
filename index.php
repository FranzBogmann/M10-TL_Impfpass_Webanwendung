<!DOCTYPE html>
<html lang="de">
    <?php include("./php/header.php"); ?>
  </head>
    <body>
    <?php include("./php/nav.php"); ?>
    <?php include("Profil.php"); ?>   

        <!-- Ab hier kommt der Inhalt der Seite--> 

        <div class="container">
            <div class="row">
                <p>Herzlich Willkommen bei deinem digitalen Impfpass😉</p>
                <p>Diese Webanwendung erlaubt dir deine Impfungen digital zu erfassen. So hast Du deinen Imfpass immer dabei!👌</p>
            </div>

            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                      <img src="images/pexels/ImpfpassHandy.jpg" class="card-img-top" alt="Digitaler Impfpass">
                      <div class="card-body">
                        <h5 class="card-title">Impfungen eintragen</h5>
                        <p class="card-text">Digitalisiere Deine Impfungen durch neue Impfeinträge in den digitalen Impfpass!</p>
                        <a href="Impfpass.php" class="btn btn-primary">Zum Digitalen Impfpass</a>
                      </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                      <img src="..." class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                      </div>
                    </div>
                </div>  
            </div>
        </div>
        <br>
        
        <!-- Hier endet der Inhalt der Seite-->

        <?php include("./php/footer.php"); ?>
    </body>
    <script src="js/Bootstrap 5/bootstrap.min.js"></script>
</html>