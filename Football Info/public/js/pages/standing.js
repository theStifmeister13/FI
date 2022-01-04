const base_url = "https://api.football-data.org";

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getStandingByLeagueID() {
  console.log("sini");
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  standingHTML = ""

  waitForEl("#standings > table > tbody", function () {
    fetch(base_url + "/v2/competitions/"+idParam+"/standings", {
      headers: {
        "X-Auth-Token": "8325275c7dba4f0b81af59a67366f940", //it can be iPhone or your any other attribute
      },
    })
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);

        if (data.competition.code == "CL"){
          standingHTML += `
          <div class="card">
          </div>
        `
        return
        }

        
        data.standings[0].table.forEach(function (row) {
          standingHTML += `
          <tr>
            <td>${row.team.name}</td>
            <td>${row.playedGames}</td>
            <td>${row.won}</td>
            <td>${row.draw}</td>
            <td>${row.lost}</td>
            <td>${row.goalsFor}</td>
            <td>${row.goalsAgainst}</td>
            <td>${row.goalDifference}</td>
            <td>${row.points}</td>
          </tr>
        `;
        })
   
        
        document.querySelector("#standings > table > tbody").innerHTML = standingHTML;
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
