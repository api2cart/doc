const $ = jQuery;
var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

const HelperUtils = {

  firstTimeLoad: true,

  getSwaggerBaseURL : function() {
    const applicationEnv = typeof window.APPLICATION_ENV !== 'undefined' ? window.APPLICATION_ENV : 'production';
    let baseURL = '';
    switch (applicationEnv) {
      case 'production':
        baseURL = "https://app.api2cart.com/";
        break;
      case 'beta':
        baseURL = "https://beta.api2cart.com/";
        break;
      case '':
        baseURL = "https://app.api2cart.local.com/";
        break;
      default:
        baseURL = "https://app.api2cart.com/";
    }
    return baseURL;
  },

  loadSwagger : function() {
    var cartId = $('#cart-id').val();
    if (cartId === 'all') {
      cartId = false;
    }
    var backupHash = window.location.hash;
    window.location.hash = '';
    return SwaggerUIBundle({
      url: HelperUtils.getSwaggerBaseURL() + "default/index/openapi-json" + (cartId ? "?cart-id=" + cartId : ""),
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      validatorUrl: null,
      layout: "StandaloneLayout",
      requestInterceptor: (req) => {
        if (req.body) {
          let body = JSON.parse(req.body);
          function replaceWithTypes(obj) {
            for (let key in obj) {
              if (typeof obj[key] === "string") obj[key] = "string";
              else if (typeof obj[key] === "number") obj[key] = 0;
              else if (typeof obj[key] === "boolean") obj[key] = true;
              else if (Array.isArray(obj[key])) obj[key] = obj[key].map(() => "array_item");
            }
          }
          replaceWithTypes(body);
          req.body = JSON.stringify(body);
        }
        return req;
      },
      onComplete: function() {
        window.location.hash = backupHash; // restore location hash

        HelperUtils.sidemenuSwaggerSync();
        const scrollPos = window.history.scrollPosBackup || $(window).scrollTop();
        if (HelperUtils.firstTimeLoad || scrollPos > 610) {
          HelperUtils.setCartId(HelperUtils.getParam('cart_id'));
          HelperUtils.swaggerScrollIntoCategory(window.location.hash, true, 100);
        }
        HelperUtils.firstTimeLoad = false;
      }
    });
  },

  replaceCartId : function(cartId) {
    let uri = window.location.pathname + "?version=v1.1&cart_id=" + cartId + window.location.hash;
    window.history.pushState({}, document.title, uri);
  },


  setSwaggerLink : function(link) {
    $('#link-to-swagger').attr('href', HelperUtils.getSwaggerBaseURL() + link);
  },

  checkCartId : function(cartId) {
    this.setSwaggerLink("openapi/openapi.json");
    const options = $('#swagger-carts-list option');
    $.each(options, function () {
      if ($(this).val() == cartId) {
        $(this).prop('selected', true);
        HelperUtils.setSwaggerLink("openapi/" + (cartId != "0" ? cartId : "") + "/openapi.json");
      }
    });
  },

  setCartId : function(cartId) {
    $('#cart-id').val(cartId);
    $('#swagger-carts-list option[value="' + cartId + '"]').prop('selected', true);
  },

  getParam : function(name){
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
      return null;
    }
    return decodeURI(results[1]) || 0;
  },

  // sync side submenu items with actual swagger categories
  sidemenuSwaggerSync : function() {
    if (window.location.pathname != '/docs/') {
      return;
    }
    const categorieEls = document.querySelectorAll('.opblock-tag');
    let categories = [];
    for (catEl of categorieEls) {
      categories.push( catEl.dataset.tag );
    }

    let html = '';
    for (catName of categories) {
      html += `
        <li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item">
          <a href="#/${catName}" onclick="HelperUtils.swaggerScrollIntoCategory('#/${catName}')" class="pure-menu-link">${catName.charAt(0).toUpperCase() + catName.slice(1)}</a>
        </li>
      `;
    }
    document.querySelector('#menu-newdocs-vertical ul').innerHTML = html;
  },

  swaggerScrollIntoCategory : function(catName, doOpenBlock = false, height = 50) {
    const catEl = document.querySelector('.swagger-ui a[href="' + catName + '"]');
    if (!catEl) return;
    // also take into account fixed header height
    const headerEl = document.querySelector('.menu-header');
    const headerElPosition = window.getComputedStyle(headerEl, null).position;
    const headerElHeight = parseInt(window.getComputedStyle(headerEl, null).height);

    const categoryElDistanceToTop = window.scrollY + catEl.getBoundingClientRect().top;
    let needToScrollY = categoryElDistanceToTop - headerElHeight - height;
    if (headerElPosition !== 'fixed') {
      needToScrollY -= headerElHeight;
    }

    window.scroll({
      top: needToScrollY,
      left: 0,
      behaivior: 'smooth'
    });

    if (doOpenBlock) {
      const opblock = document.querySelector('#operations-' + catName.replace(/^#\/(.*)$/, "$1").replace('/', '-'));
      if (opblock !== null && opblock.classList.contains('is-open') === false) {
        catEl.click();
      }
    }

    return false;
  }
}

$(document).ready(function () {
  $('#swagger-carts-list').change(function () {
    window.history.scrollPosBackup = $(window).scrollTop();
    const cartId = $('#swagger-carts-list').val();
    HelperUtils.checkCartId(cartId);
    HelperUtils.replaceCartId(cartId);
    HelperUtils.setCartId(cartId);
    HelperUtils.loadSwagger();
    HelperUtils.setSwaggerLink("openapi/" + (cartId != "0" ? cartId : "") + "/openapi.json");
  });

  HelperUtils.checkCartId(HelperUtils.getParam('cart_id'));
  HelperUtils.setCartId(HelperUtils.getParam('cart_id'));
  HelperUtils.loadSwagger();
});

// sticky scroll select
$(document).ready(function () {
  var cloneHeader = $('.swagger-scroll-fixed');
  $(window).scroll(function () {
    if ($(window).scrollTop() > 610) {
      cloneHeader.addClass('swagger-scroll-is-shown');
    } else {
      cloneHeader.removeClass('swagger-scroll-is-shown');
    }
  });
});

// hack to avoid scrolling by swagger-ui implementation
$(document).ready(function(){
  window.addEventListener("load", function(){
    $('html, body').stop(true);
    setTimeout(function(){
      $('html, body').stop(true);
      HelperUtils.swaggerScrollIntoCategory(window.location.hash, true);
    },10);
  });
});

// populate platform list
// ----------------------
let PLATFORM_LIST = [];

// populate platform selects
// -------------------------
class PlatformSelectRenderer {
  static renderSelect(el) {
    let optionsStr = `
    <option value="0" selected="" disabled="">Please select a platform..</option>
    <option value="0">All Paltforms View</option>
  `;
    PLATFORM_LIST.forEach(plat => {
      optionsStr += `<option value="${plat.slug}">${plat.title}</option>`;
    });
    el.innerHTML = optionsStr;
  }

  static renderAllSelects() {
    document.querySelectorAll('[id="swagger-carts-list"]').forEach(el => this.renderSelect(el));
  }
}

class SwaggerAPI {

}

SwaggerAPI.SWAGGER_API_CACHE = {};

// data provider
// -------------------
class DataProvider {
  static async populatePlatformList() {
    const SLUG2TITLE = await this.getPlatformName();
    const json = await this.getPlatformSwagger("All");
    const platforms = json.components.schemas.AccountCartAdd.properties.cart_id.enum;

    PLATFORM_LIST = platforms.map(plat => {
      const title = SLUG2TITLE.hasOwnProperty(plat) ? SLUG2TITLE[plat]['name'] : plat;
      return {slug: plat, title: title};
    });

    PLATFORM_LIST.sort((a, b) => {
      if (a.slug == b.slug) return 0;
      return (a.slug > b.slug) ? 1:-1;
    });
  }

  static async getPlatformSwagger(platform) {
    if (SwaggerAPI.SWAGGER_API_CACHE[platform] !== undefined) {
      return SwaggerAPI.SWAGGER_API_CACHE[platform];
    }
    let url = HelperUtils.getSwaggerBaseURL() + "default/index/openapi-json";
    if (platform !== "All") {
      url = url + '?cart-id=' + platform;
    }
    const resp = await fetch(url);
    const json = await resp.json();
    SwaggerAPI.SWAGGER_API_CACHE[platform] = json;
    return json;
  }

  static async getPlatformName() {
    if (SwaggerAPI.SWAGGER_API_CACHE['names'] !== undefined) {
      return SwaggerAPI.SWAGGER_API_CACHE['names'];
    }

    let url = window.location.origin + '/wp-content/themes/a2c-amp/templates/platformsData.php';
    const resp = await fetch(url);
    const json = await resp.json();
    let result = json.result;
    SwaggerAPI.SWAGGER_API_CACHE['names'] = result;
    return result;
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  await DataProvider.populatePlatformList();
  if (PLATFORM_LIST.length > 0) {
    PlatformSelectRenderer.renderAllSelects();
    HelperUtils.setCartId(HelperUtils.getParam('cart_id'));
  }
});