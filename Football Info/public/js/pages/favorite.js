import { getAll,deleteSchedule } from "../db.js";

let scheduleHTML = ``;
let matchId;

export function getSavedArticles() {
  getAll().then(function(schedules) {
    console.log(schedules);
    if (schedules.length > 0) {
      schedules.forEach(function (row) {
        var date = moment(row.utcDate);

        scheduleHTML += `<div class="col s12 m6">
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
                        }" id="delete">
                        <i class="small material-icons">delete</i>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;
      });
    } else {
      scheduleHTML = "Tidak ada favorite pertandingan";
    }
    document.getElementById("body-content-3").innerHTML = scheduleHTML;

    $(document).on("click", "a#delete", function () {
      matchId = $(this)[0].attributes[1].nodeValue;
      console.log(matchId);
      if (matchId.length > 1) {
        deleteSchedule(matchId).then(function () {
          location.reload();
        });
      }
    });
  });
}