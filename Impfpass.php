<!DOCTYPE html>
<html lang="de">
    <?php include("./php/header.php"); ?>
    <script src="js/Impfpass.js"></script>
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
                                data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>


                        <div class="modal-body">
                            <!-- Radio Buttons-->
                            <div id="impfTyp" class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" class="btn-check" name="impfungArt" id="einfachImpfung" autocomplete="off" checked>
                                <label class="btn btn-outline-primary" for="einfachImpfung">Einfach-Impfung</label>

                                <input type="radio" class="btn-check" name="impfungArt" id="multiImpfung" autocomplete="off">
                                <label class="btn btn-outline-primary" for="multiImpfung">Multi-Impfung</label>
                            </div>

                            <br>
                            <br>
                            
                            <!-- Dropdown zur Impfauswahl-->
                            <div id="dropdown">
                                <label for="form-select">Wählen Sie ihre Impfung:</label>
                                <select class="form-select" aria-label="Default select example" onfocus='this.size=5;' onblur='this.size=1;' onchange='this.size=1; this.blur();'>
                                    <option value="1">Diphtherie</option>
                                    <option value="2">FSME</option>
                                    <option value="3">Grippe</option>
                                    <option value="4">HepatitisB</option>
                                    <option value="5">HepatitisB (HiB)</option>
                                    <option value="6">HPV</option>
                                    <option value="7">Keuchhusten</option>
                                    <option value="8">Masern</option>
                                    <option value="9">Meningokokken</option>
                                    <option value="10">Mumps</option>
                                    <option value="11">Pneumokokken</option>
                                    <option value="12">Polio</option>
                                    <option value="13">Rotavirus</option>
                                    <option value="14">Roeteln</option>
                                    <option value="15">Tetanus</option>
                                    <option value="16">Windpocken</option>
                                    <option value="17">Guertelrose</option>
                                    <option value="18">Covid-19</option>
                                </select>
                                <br>
                            </div>

                            <!-- Radiobuttons für die MultiImpfung -->
                            <div id="schieberegler" style="display: none;">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="Tetanus">
                                    <label class="form-check-label" for="Tetanus">Tetanus</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="Diphtherie">
                                    <label class="form-check-label" for="Diphtherie">Diphtherie</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="Pertussis">
                                    <label class="form-check-label" for="Pertussis">Pertussis</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="Influenza B (Hib)">
                                    <label class="form-check-label" for="Influenza B (Hib)">Influenza B (Hib)</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="Hepatitis B">
                                    <label class="form-check-label" for="Hepatitis B">Hepatitis B</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="Poliomyelitis">
                                    <label class="form-check-label" for="Poliomyelitis">Poliomyelitis</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="Masern">
                                    <label class="form-check-label" for="Masern">Masern</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="Mumps">
                                    <label class="form-check-label" for="Mumps">Mumps</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="Röteln">
                                    <label class="form-check-label" for="Röteln">Röteln</label>
                                </div>
                            </div>

                            <!-- Felder die Ausgefühlt werden müssen -->
                            <form id="impfFelder">
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label>Datum: </label>
                                            <input type="date" id="iDatum" placeholder="Datum der Impfung"></input>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label>Charge: </label>
                                            <input type="text" id="iChargenNr" placeholder="Chargennummer"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label>Arzt: </label>
                                            <input type="text" id="iArzt" placeholder="Arzt der Impfte"></input>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label>Impfstoff: </label>
                                            <input type="text" id="impfstoff" placeholder="Verwendeter Impfstoff"></input>
                                        </div>
                                    </div>
                                </div>
                            </form>                   
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
                            <button type="button" class="btn btn-primary" id="iSpeichern" disabled>Speichern</button>
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