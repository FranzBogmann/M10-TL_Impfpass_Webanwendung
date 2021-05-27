<!DOCTYPE html>
<html lang="de">
    <?php include("./php/header.php"); ?>
</head>
    <body>
        <?php include("./php/nav.php"); ?>
        <?php include("Profil.php"); ?>

        <!-- Ab hier kommt der Inhalt der Seite-->
        <div class="container">
            <button type="button" data-bs-toggle="modal" class="btn btn
                btn-warning btn-lg" data-bs-target="#Termin" id="terminAnlegenButton">+ Impfung hinzufügen</button>
            <br>
            <br>
            <!-- Modal für Impfung hinzufügen Maske -->
            <div class="modal fade" id="Termin" tabindex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered
                    modal-dialog-scrollable">
                    <div class="modal-content">


                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Impfung
                                hinzufügen</h5>
                            <button type="button" class="btn-close"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>


                        <div class="modal-body">
                            <!-- Radio Buttons-->
                            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" class="btn-check" name="impfungArt" id="einfachImpfung" autocomplete="off" checked>
                                <label class="btn btn-outline-primary" for="einfachImpfung">Einfach-Impfung</label>

                                <input type="radio" class="btn-check" name="impfungArt" id="multiImpfung" autocomplete="off">
                                <label class="btn btn-outline-primary" for="multiImpfung">Multi-Impfung</label>
                            </div>

                            <br>
                            <br>
                            
                            <!-- Dropdown für MultiImpfung-->
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenu">
                                    <button class="dropdown-item" type="button">Action</button>
                                    <button class="dropdown-item" type="button">Another action</button>
                                    <button class="dropdown-item" type="button">Something else here</button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>     
        <!-- Hier endet der Inhalt der Seite-->

        <?php include("./php/footer.php"); ?>
    </body>
    <script src="js/Bootstrap 5/bootstrap.min.js"></script>
</html>