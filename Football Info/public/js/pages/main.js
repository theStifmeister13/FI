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

function getDashboardItem() {
  console.log("sini dong")
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  articlesHTML=""

  waitForEl("#articles", function() {
    $.getJSON("data/league.json", function (data) {
          data.forEach(function (league) {
            console.log(league)
            articlesHTML += `
            <div class="col s12 m6">
            <div class="card hoverable small">
              <div class="card-image">
                <img class="responsive-img" src="/img/league/${league.image}.jpg" alt="fbw img">
                  <span class="card-title">${league.name}</span>
                  
              </div>              
              <div class="card-action">              
                <a href="./standing.html?id=${league.competition_id}">Standings</a>                
              </div>
            </div>
          </div>
              `;
          });
          document.getElementById('articles').innerHTML = articlesHTML;
        });
  });

}


let waitForSomeElement = () => {
  const container = document.getElementById('articles');
  console.log("nunggu articles")
  if (!container) {
      setTimeout(waitForSomeElement , 5000); // give everything some time to render
  }
};

var waitForEl = function(selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 100);
  }
};
