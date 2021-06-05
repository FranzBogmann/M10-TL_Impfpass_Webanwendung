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
                <p>Willkommen bei dem digitalen Impfpass💉</p>
                <p>Diese Webanwendung erlaubt dir alle deine vergangenen Impfungen digital zu erfassen sowie zukünftige Impftermine zu speichern. So hast Du deinen Impfpass immer dabei und verlierst nie den Überblick über alle Impfungen!😉</p>
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
                          <div class="card-body">
                            <h5 class="card-title">Anleitung zur Nutzung</h5>
                            <p class="card-text">Der digitale Impfpass besteht aus drei Bereichen: Einem Nutzerprofil, der Terminübersicht und dem Impfpass selbst.</p>
                          </div>
                          <img src="images/index/Tutorial.png" class="card-img-bottom" alt="Anleitung zum Impferfolg">
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