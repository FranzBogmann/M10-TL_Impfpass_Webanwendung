<!DOCTYPE html>
<?php include("./php/header.php"); ?>
    <body>
        <?php include("./php/nav.php"); ?>
        <?php include("Profil.php"); ?>
        <!-- Ab hier kommt der Inhalt der Seite-->
        <div class="container">

            <!-- Button trigger modal -->
            <button type="button" data-bs-toggle="modal" class="btn btn
                btn-warning btn-lg" data-bs-target="#Termin" id="terminAnlegenButton">+ Termin hinzufügen</button>
            <br>
            <br>
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
                                    >Datum</span>
                                <input id="terminDatum" type="datetime-local" class="form-control"
                                    aria-label="Datum"
                                    aria-describedby="basic-addon1">
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text"
                                    >Impfung gegen</span>
                                <input type="text" class="form-control"
                                    placeholder="ADHS" aria-label="Impfung gegen"
                                    aria-describedby="basic-addon1" id="terminArt">
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


            <h4>Termine</h4>
            <div class="row">
                <table id="termine" class="table table-hover">
                    <thead>
                        <tr class="d-flex">
                            <th class="col-3">Termin-Datum</th>
                            <th class="col-3">Art</th>
                            <th class="col-3">ausstehend seit</th>
                            <th class="col-3">Arzt</th>
                        </tr>
                    </thead>
                    <tbody id="terminDaten">
                    </tbody>
                </table>
            </div>

            <h4>Ausstehend</h4>
            <div class="row">
                <table id="ausstehende" class="table table-hover table-responsive">
                    <thead>
                        <tr class="d-flex">
                            <th class="col-3">Datum</th>
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

            <h4>Abgeschlossen</h4>
            <div class="row">
                <table id="abgeschlossene" class="table table-hover">
                    <thead>
                        <tr class="d-flex">
                            <th class="col-3">Datum</th>
                            <th class="col-3">Art</th>
                            <th class="col-3">Chargen-Nr.</th>
                            <th class="col-3">Arzt</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="d-flex" name="abgeschlossenEintrag">
                            <td class="col-3" name="abgeschlossenDatum">21.5.2020</td>
                            <td class="col-3" name="abgeschlossenArt">Grippe</td>
                            <td class="col-3" name="abgeschlossenCharge">G010-872</td>
                            <td class="col-3" name="abgeschlossenArzt">Max Mueller</td>
                        </tr>
                        <tr class="d-flex" name="abgeschlossenEintrag">
                            <td class="col-3" name="abgeschlossenDatum">22.5.2020</td>
                            <td class="col-3" name="abgeschlossenArt">Grippe</td>
                            <td class="col-3" name="abgeschlossenCharge">G069-555</td>
                            <td class="col-3" name="abgeschlossenArzt">Max Mueller</td>
                        </tr>
                        <tr class="d-flex" name="abgeschlossenEintrag">
                            <td class="col-3" name="abgeschlossenDatum">24.5.2010</td>
                            <td class="col-3" name="abgeschlossenArt">Kombi</td>
                            <td class="col-3" name="abgeschlossenCharge">G010-691</td>
                            <td class="col-3" name="abgeschlossenArzt">Max Mueller</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


        <!-- Hier endet der Inhalt der Seite-->

<?php include("./php/footer.php"); ?>
    </body>
    <script src="js/Bootstrap 5/bootstrap.min.js"></script>
</html>