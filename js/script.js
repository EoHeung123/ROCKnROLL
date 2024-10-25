// 스크롤 전환
$(document).ready(function () {
  $(window).scroll(function () {
    var scrollTop = $(this).scrollTop();

    if (scrollTop > 100) {
      $(".main-screen").css("opacity", 0);
      //h2고정 작동 안 함
      $(".main-screen h2").css("opacity", 1);
      $(".menu-screen").css("top", "0");
    } else {
      $(".main-screen").css("opacity", 1);
    }
  });
});

// 페이지 이동
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", function () {
      if (this.id === "band") {
        window.location.href = "scheduler.html";
      }
    });
  });
});
