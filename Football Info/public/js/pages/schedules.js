import { saveFavorite } from "../db.js";

const base_url = "https://api.football-data.org";

let standingHTML = ``;
let matchId;

function json(response) {
  return response.json();
}

export function getScheduleList() {
  $("#league-dropdown").change(function () {
    var optionSelected = $("option:selected", this);
    console.log(optionSelected);

    standingHTML = ``

    fetch(
      base_url +
        "/v2/competitions/" +
        optionSelected[0].value +
        "/matches?status=SCHEDULED",
      {
        headers: {
          "X-Auth-Token": "8325275c7dba4f0b81af59a67366f940", //it can be iPhone or your any other attribute
        },
      }
    )
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);

        if (data.matches.length > 0) {
          data.matches.forEach(function (row) {
            var date = moment(row.utcDate);

            standingHTML += `<div class="col s12 m6">
                <div class="card card-content padding 10">
                    <div class="row">
                        <div class="card-title" style="padding: 0px 8px 12px;">${date.format(
                          "LLLL"
                        )}</div>
                        <div style="padding-left:8px">Status<span class="new badge red" data-badge-caption="Belum Selesai"></span></div>
                        <div class="divider"></div>
                    </div>
                    <div class="row" style="padding-top:12px">
                        <div class="col center side-percentage">
                            <div class="cut-text min-height-45">
                                ${row.homeTeam.name}
                            </div>
                        </div>
                        <div class="col center mid-percentage">
                            <div class="cut-text">vs</div>
                        </div>
                        <div class="col center side-percentage">
                            <div class="cut-text min-height-45">
                              ${row.awayTeam.name}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col center side-percentage">
                            <div>
                                ~
                            </div>
                        </div>
                        <div class="col center mid-percentage">
                            <div>:</div>
                        </div>
                        <div class="col center side-percentage">
                            <div>
                                ~
                            </div>
                        </div>
                        <div>
                            <a class="btn-floating btn-small red" data="${
                              row.id
                            }" id="save">
                            <i class="small material-icons">save</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>`;
          });
        } else {
          standingHTML = "Tidak ada jadwal pertandingan";
        }

        // // Sisipkan komponen card ke dalam elemen dengan id #content
        document.querySelector("#schedule-list").innerHTML = standingHTML;

        $(document).on("click", "a#save", function () {
          matchId = $(this)[0].attributes[1].nodeValue;
          console.log(matchId);
          if (matchId.length > 1) {
            fetch(base_url + "/v2/matches/" + matchId, {
              headers: {
                "X-Auth-Token": "8325275c7dba4f0b81af59a67366f940", //it can be iPhone or your any other attribute
              },
            })
              .then(status)
              .then(json)
              .then(function (data) {
                console.log(data);
                saveFavorite(data);
              });
          }
        });
      })
      .catch(function (data) {
        console.log(data);
        document.querySelector("#schedule-list").innerHTML =
          "Tidak ada jadwal pertandingan";
      });
  });
}

var waitForEl = function (selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function () {
      waitForEl(selector, callback);
    }, 100);
  }
};
