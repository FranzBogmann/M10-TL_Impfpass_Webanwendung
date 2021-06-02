<!DOCTYPE html>
<html lang="de">
    <?php include("./php/header.php"); ?>
    <script src="js/Impfpass.js"></script>
    <script src="js/Impfungen.js"></script>
</head>
    <body>
        <?php include("./php/nav.php"); ?>
        <?php include("Profil.php"); ?>

        <!-- Ab hier kommt der Inhalt der Seite-->
        <div class="container" >
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
                                <select id="iArt" class="form-select" aria-label="Default select example" onfocus='this.size=5;' onblur='this.size=1;' onchange='this.size=1; this.blur();'>
                                    <option value="Diphtherie">Diphtherie</option>
                                    <option value="FSME">FSME</option>
                                    <option value="Grippe">Grippe</option>
                                    <option value="HepatitisB">Hepatitis B</option>
                                    <option value="Hib">Influenza B (HiB)</option>
                                    <option value="HPV">HPV</option>
                                    <option value="Keuchhusten">Keuchhusten</option>
                                    <option value="Masern">Masern</option>
                                    <option value="Meningokokken">Meningokokken</option>
                                    <option value="Mumps">Mumps</option>
                                    <option value="Pneumokokken">Pneumokokken</option>
                                    <option value="Polio">Polio</option>
                                    <option value="Rotaviren">Rotaviren</option>
                                    <option value="Roeteln">Röteln</option>
                                    <option value="Tetanus">Tetanus</option>
                                    <option value="Windpocken">Windpocken</option>
                                    <option value="Guertelrose">Gürtelrose</option>
                                    <option value="Covid19">Covid-19</option>
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
                                    <input class="form-check-input" type="checkbox" id="Keuchhusten">
                                    <label class="form-check-label" for="Keuchhusten">Pertussis (Keuchhusten)</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="Hib">
                                    <label class="form-check-label" for="Hib">Influenza B (Hib)</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="HepatitisB">
                                    <label class="form-check-label" for="HepatitisB">Hepatitis B</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="Polio">
                                    <label class="form-check-label" for="Polio">Poliomyelitis</label>
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
                                    <input class="form-check-input" type="checkbox" id="Roeteln">
                                    <label class="form-check-label" for="Roeteln">Röteln</label>
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
                            <button type="button" class="btn btn-primary" id="iSpeichern" data-bs-dismiss="modal" disabled>Speichern</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Ende des Impfungsbutton -->

            <!-- Beginn der Profil Übersicht -->
                <div class="" id="impfpassProfil">
                    <div class="card p-3">
                        <div class="d-flex align-items-center">
                            <div> <img src="/images/icons/favicon.svg" id="IprofilBild" class="rounded" width="100" height="100" style="margin: 5px"> </div>
                            <div class="ml-3 w-100">
                                <h4 class="mb-0 mt-0" id="IanmeldeName">Max Mustermann</h4>
                                <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                    <div class="container">
                                        <div class="row">
                                    <div class="col-lg-2 col-md-4 col-sm-6 col-12"> <span>Email:</span> <br> <span id="Iemail"></span></div>
                                    <div class="col-lg-2 col-md-4 col-sm-6 col-12"> <span>Geburtsdatum:</span> <br> <span id="Igeburtsdatum"></span> </div>
                                    <div class="col-lg-3 col-md-4 col-sm-6 col-12"> <span>Wohnsitz:</span> <br> <span id="Iwohnsitz"></span></div>
                                    <div class="col-lg-2 col-md-6 col-sm-6 col-12"> <span>Hausarzt:</span> <br> <span id="Iarzt"></span> </div>
                                    <div class="col-lg-3 col-md-6 col-sm-6 col-12"> <span>Telefonnummer Arzt:</span> <br> <span id="Iarztnummer"></span> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <br>
            <!-- Ende der Profil Übersicht -->

            <!-- Beginn der Impfungstabellen -->
            <h4>Einfach-Impfungen</h4>
            <div class="row">
                <div class="table-responsive">
                    <table class="table table-hover" style="padding-left: 12px">
                        <thead>
                            <tr class="d-flex">
                                <th class="col-2">Datum</th>
                                <th class="col-2">Art</th>
                                <th class="col-2">Impfstoff</th>
                                <th class="col-3">Chargen-Nr.</th>
                                <th class="col-3">Arzt</th>
                            </tr>
                        </thead>
                        <tbody id="einfachImpfungTabelle">
                        </tbody>
                    </table>
                </div>
            </div>
            <h4>Multi-Impfungen</h4>
            <div class="row">
                <div class="table-responsive">
                    <table class="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Datum</th>
                                <th>Impfstoff</th>
                                <th>Chargennummer</th>
                                <th>Tetanus</th>
                                <th>Diphtherie</th>
                                <th>Pertussis</th>
                                <th>Influenza B (Hib)</th>
                                <th>HepatitisB</th>
                                <th>Poliomyelitis</th>
                                <th>Masern</th>
                                <th>Mumps</th>
                                <th>Röteln</th>
                                <th>Arzt</th>
                            </tr>
                        </thead>
                        <tbody id="multiImpfungTabelle">
                        <!-- <tr class="d-flex" name="abgeschlossenEintrag">
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
                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- Ender der Imnpfungstabellen -->
        </div>     
        <!-- Hier endet der Inhalt der Seite-->

        <?php include("./php/footer.php"); ?>
    </body>
    <script src="js/Bootstrap 5/bootstrap.min.js"></script>
</html>