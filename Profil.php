<div class="modal fade" id="Profilepage" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Profil Übersicht</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row flex-lg-nowrap">
              <div class="col">
                <div class="row">
                  <div class="col mb-3">
                    <div class="card">
                      <div class="card-body">
                        <div class="e-profile">
                          <div class="row">
                            <div class="col-12 col-sm-auto mb-3">
                              <div class="mx-auto" style="width: 140px;">
                                <div class="d-flex justify-content-center align-items-center rounded" id="bildContainer"
                                  style="height: 140px; background-color: rgb(233, 236, 239);">
                                  <img src="" id="profilBild" class="preview_img" width="140px" height="140px" style="display: none;"/>
                                  <span id="previewText" style="color: rgb(166, 168, 170); font: bold 8pt Arial;">140x140</span>
                                </div>
                              </div>
                            </div>
                            <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                              <div class="text-center text-sm-left mb-2 mb-sm-0">
                                <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap" id="anmeldeName">Max Mustermann</h4>
                                <div class="mt-2">
                                  <input type="file" id="default-file" hidden="hidden" />
                                  <button class="btn btn-primary" type="button" id="changePhoto">
                                    <i class="fa fa-fw fa-camera"></i>
                                    <span>Profilbild ändern</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="tab-content pt-3">
                            <div class="tab-pane active">
                              <form class="form" novalidate="">
                                <div class="row">
                                  <div class="col">
                                    <div class="row">
                                      <div class="col">
                                        <div class="form-group">
                                          <label>Vorname</label>
                                          <input disabled class="form-control" type="text" name="name" id="vorname"
                                            placeholder="Max">
                                        </div>
                                      </div>
                                      <div class="col">
                                        <div class="form-group">
                                          <label>Nachname</label>
                                          <input disabled class="form-control" type="text" name="familyname" id="nachname"
                                            placeholder="Mustermann">
                                        </div>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col">
                                        <div class="form-group">
                                          <label>Email</label>
                                          <input disabled class="form-control" type="email" id="email"
                                            placeholder="user@example.com">
                                        </div>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col">
                                        <div class="form-group">
                                          <label>Geburtsdatum</label>
                                          <input disabled class="form-control" type="date" placeholder="1.1.1970" id="geburtsdatum">
                                        </div>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col">
                                        <div class="form-group">
                                          <label>Wohnsitz</label>
                                          <input disabled class="form-control" type="text" name="name" id="wohnsitz"
                                            placeholder="Musterstraße 32">
                                        </div>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col">
                                        <div class="form-group">
                                          <label>Hausartzt</label>
                                          <input disabled class="form-control" type="text" name="name" id="hausarzt"
                                            placeholder="Dr. Musterartzt">
                                        </div>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col">
                                        <div class="form-group">
                                          <label>Hausartzt Telefonnummer</label>
                                          <input disabled class="form-control" type="tel" name="name" id="hausarztTelefonnummer"
                                            placeholder="11880 123456789">
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-primary" id="bearbeiten">Bearbeiten</button>
        </div>
      </div>
    </div>
  </div>