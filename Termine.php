<!DOCTYPE html>
<?php include("./php/header.php"); ?>
        <script src="js/Termine.js"></script>
        <script src="js/Impfungen.js"></script>
    </head>
    <body>
        <?php include("./php/nav.php"); ?>
        <?php include("Profil.php"); ?>
        <!-- Ab hier kommt der Inhalt der Seite-->
        <div class="container">

            <!-- Button trigger modal -->
            <!--<button type="button" data-bs-toggle="modal" class="btn btn
                btn-warning btn-lg" data-bs-target="#Termin" id="terminAnlegenButton">+ Termin hinzufügen</button>
            <br>
            <br>-->
            <!-- Modal für Termin hinzufügen Maske -->
            <div class="modal fade" id="Termin" tabindex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered
                    modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Termin
                                hinzufügen</h5>
                            <button type="button" class="btn-close"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <!-- Eingabefelder für das Anlegen eines Termins -->

                            <div class="input-group mb-3">
                                <span class="input-group-text"
                                    >Datum/Zeit</span>
                                <input id="terminDatum" type="date" class="form-control"
                                    aria-label="Datum"
                                    aria-describedby="basic-addon1">
                                <input id="terminZeit" type="time" class="form-control"
                                    aria-label="Zeit"
                                    aria-describedby="basic-addon1">
                            </div>

                            <div id="dropdown">
                                <label for="form-select">Ihre Impfung gegen:</label>
                                <select id="terminArt" class="form-select" aria-label="Default select example" onfocus='this.size=5;' onblur='this.size=1;' onchange='this.size=1; this.blur();'>
                                </select>
                                <br>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text"
                                    >Arzt/Ärztin</span>
                                <input type="text" class="form-control"
                                    placeholder="Dr. Sommer" aria-label="Arzt"
                                    aria-describedby="basic-addon1" id="terminArzt">
                            </div>
                            <ul class="list-inline" id="kontaktArzt">
                            </ul>
                            

                        </div>
                        <div class="modal-footer" id="terminFooter">
                            <button type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal">Schließen</button>
                            <button type="button" id="terminAnlegen" class="btn btn-primary" data-bs-dismiss="modal">
                                Termin anlegen
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <p>Auf der Termine-Seite werden Ihre Termine sowie die letzten und ausstehenden Impfungen tabellarisch dargestellt.</p>
            <p>Hier werden die Daten aus Ihrem Impfpass ausgelesen und überprüft, ob eine Auffrischungsimpfung erforderlich ist bzw.
            die Impfung noch nicht vorhanden ist.</p>
            <br>
            <h4>Termine</h4>
            <div class="row">
                <div class="table-responsive">
                    <table id="termine" class="table table-hover">
                        <thead>
                            <tr class="d-flex">
                                <th class="col-3" data-sortable="true">Termin-Datum</th>
                                <th class="col-3">Art</th>
                                <th class="col-2">ausstehend seit</th>
                                <th class="col-3">Arzt</th>
                                <th class="col-1"></th>
                            </tr>
                        </thead>
                        <tbody id="terminDaten">
                            <!-- Hier werden die Einträge dynamisch aus dem LocalStorage erzeugt -->
                        </tbody>
                    </table>
                </div>
            </div>
            <br>
            <h4>Ausstehende Impfungen</h4>
            <div class="row">
                <div class="table-responsive">
                    <table id="ausstehende" class="table table-hover table-responsive">
                        <thead>
                            <tr class="d-flex">
                                <th class="col-3">ausstehend seit</th>
                                <th class="col-3">Art</th>
                                <th class="col-3">letzte Impfung</th>
                                <th class="col-3">Termin buchen</th>
                            </tr>
                        </thead>
                        <tbody id="ausstehendDaten">
                            <!--Hier werden Daten automatisch aus den abgeschlossenen Impfungen generiert-->
                        </tbody>
                    </table>
                </div>
            </div>
            <br>
            <h4>Letzte Impfungen</h4>
            <div class="row">
                <div class="table-responsive">
                    <table id="abgeschlossene" class="table table-hover">
                        <thead>
                            <tr class="d-flex">
                                <th class="col-4">Art</th>
                                <th class="col-4">letzte Impfung</th>
                                <th class="col-4">Arzt</th>
                            </tr>
                        </thead>
                        <tbody id="letzteImpfungenDaten">
                            <!--Hier werden die Einträge dynamisch aus dem Impfpass erzeugt -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <br>

        <!-- Hier endet der Inhalt der Seite-->

<?php include("./php/footer.php"); ?>
    </body>
    <script src="js/Bootstrap 5/bootstrap.min.js"></script>
</html>