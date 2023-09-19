var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var HISTORY_SIZE = 64;
var STORAGE_SHINIES_KEY = "shinies";
var latestPokemon = [];
var displayedIndex = -1;
function addToHistory(pokemon) {
    latestPokemon.unshift(pokemon);
    while (latestPokemon.length > HISTORY_SIZE) {
        latestPokemon.pop();
    }
    var shinies = getShinies();
    shinies.unshift.apply(shinies, pokemon.filter(function (p) { return p.shiny; }));
    window.localStorage.setItem(STORAGE_SHINIES_KEY, JSON.stringify(shinies));
    displayedIndex = 0;
    toggleHistoryVisibility(shinies);
}
function toggleHistoryVisibility(shinies) {
    document.getElementById("previous").classList.toggle("hidden", displayedIndex >= latestPokemon.length - 1);
    document.getElementById("next").classList.toggle("hidden", displayedIndex <= 0);
    shinies = shinies !== null && shinies !== void 0 ? shinies : getShinies();
    document.getElementById("shiny-count").innerHTML = String(shinies.length);
    document.getElementById("shinies").innerHTML = shinies.map(function (p) { return p.toImage(); }).join(" ");
    document.getElementById("shiny-toggler").classList.toggle("invisible", shinies.length == 0);
}
function displayPrevious() {
    displayHistoryAtIndex(displayedIndex + 1);
}
function displayNext() {
    displayHistoryAtIndex(displayedIndex - 1);
}
function displayHistoryAtIndex(index) {
    index = Math.max(0, Math.min(index, latestPokemon.length - 1));
    displayedIndex = index;
    displayPokemon(latestPokemon[index]);
    toggleHistoryVisibility();
}
function getShinies() {
    var shinies = JSON.parse(window.localStorage.getItem(STORAGE_SHINIES_KEY));
    if (!Array.isArray(shinies)) {
        return [];
    }
    return shinies.map(function (shiny) { return GeneratedPokemon.fromJson(shiny); });
}
function toggleShinyDisplay() {
    var isInvisible = document.getElementById("shiny-container").classList.toggle("invisible");
    updateShinyToggler(!isInvisible);
}
function updateShinyToggler(shiniesVisible) {
    var button = document.getElementById("shiny-toggler");
    button.classList.toggle("is-hiding", !shiniesVisible);
    button.classList.toggle("is-showing", shiniesVisible);
}
function clearShinies() {
    if (window.confirm("Are you sure you want to clear your shiny Pokémon?")) {
        window.localStorage.removeItem(STORAGE_SHINIES_KEY);
        document.getElementById("shiny-container").classList.add("invisible");
        toggleHistoryVisibility([]);
        updateShinyToggler(false);
    }
}
var STORAGE_OPTIONS_KEY = "options";
function getOptionsFromForm() {
    return {
        n: parseInt(numberDropdown.value),
        region: regionDropdown.value,
        type: typeDropdown.value,
        legendaries: legendariesCheckbox.checked,
        nfes: nfesCheckbox.checked,
        sprites: spritesCheckbox.checked,
        natures: naturesCheckbox.checked,
        forms: formsCheckbox.checked
    };
}
function setOptions(options) {
    if (options.n != null) {
        setDropdownIfValid(numberDropdown, options.n);
    }
    if (options.region != null) {
        setDropdownIfValid(regionDropdown, options.region);
    }
    if (options.type != null) {
        setDropdownIfValid(typeDropdown, options.type);
    }
    if (options.legendaries != null) {
        legendariesCheckbox.checked = options.legendaries;
    }
    if (options.nfes != null) {
        nfesCheckbox.checked = options.nfes;
    }
    if (options.sprites != null) {
        spritesCheckbox.checked = options.sprites;
    }
    if (options.natures != null) {
        naturesCheckbox.checked = options.natures;
    }
    if (options.forms != null) {
        formsCheckbox.checked = options.forms;
    }
    if (options.generate !== undefined) {
        generateRandom();
    }
}
function persistOptions(options) {
    var optionsJson = JSON.stringify(options);
    window.localStorage.setItem(STORAGE_OPTIONS_KEY, optionsJson);
    window.history.replaceState({}, "", "?" + convertOptionsToUrlParams(options));
}
function loadOptions() {
    if (urlHasOptions()) {
        setOptions(convertUrlParamsToOptions());
    }
    else {
        var optionsJson = window.localStorage.getItem(STORAGE_OPTIONS_KEY);
        if (optionsJson) {
            setOptions(JSON.parse(optionsJson));
        }
    }
}
function urlHasOptions() {
    var queryString = window.location.href.split("?")[1];
    return queryString && queryString.length > 0;
}
function convertUrlParamsToOptions() {
    var options = {};
    var params = new URL(window.location.href).searchParams;
    if (params.has("n")) {
        options.n = parseInt(params.get("n"));
    }
    if (params.has("region")) {
        options.region = params.get("region");
    }
    if (params.has("type")) {
        options.type = params.get("type");
    }
    if (params.has("legendaries")) {
        options.legendaries = parseBoolean(params.get("legendaries"));
    }
    if (params.has("nfes")) {
        options.nfes = parseBoolean(params.get("nfes"));
    }
    if (params.has("sprites")) {
        options.sprites = parseBoolean(params.get("sprites"));
    }
    if (params.has("natures")) {
        options.natures = parseBoolean(params.get("natures"));
    }
    if (params.has("forms")) {
        options.forms = parseBoolean(params.get("forms"));
    }
    if (params.has("generate")) {
        options.generate = true;
    }
    return options;
}
function convertOptionsToUrlParams(options) {
    return Object.entries(options)
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return encodeURIComponent(key) + "=" + encodeURIComponent(value);
    })
        .join("&");
}
var PATH_TO_SPRITES = 'sprites/normal/';
var PATH_TO_SHINY_SPRITES = 'sprites/shiny/';
var SPRITE_EXTENTION = '.png';
var GeneratedPokemon = (function () {
    function GeneratedPokemon(pokemon, form, options) {
        var _a;
        if (!pokemon) {
            return;
        }
        this.id = pokemon.id;
        this.baseName = pokemon.name;
        this.name = (_a = form === null || form === void 0 ? void 0 : form.name) !== null && _a !== void 0 ? _a : pokemon.name;
        this.spriteSuffix = form === null || form === void 0 ? void 0 : form.spriteSuffix;
        if (options.natures) {
            this.nature = generateNature();
        }
        this.shiny = Math.floor(Math.random() * 65536) < 16;
        this.date = new Date();
    }
    GeneratedPokemon.generate = function (pokemon, form, options) {
        return new GeneratedPokemon(pokemon, form, options);
    };
    GeneratedPokemon.fromJson = function (parsed) {
        var pokemon = new GeneratedPokemon();
        Object.assign(pokemon, parsed);
        return pokemon;
    };
    GeneratedPokemon.prototype.toHtml = function (includeSprite) {
        var classes = "";
        if (this.shiny) {
            classes += "shiny ";
        }
        if (!includeSprite) {
            classes += "imageless ";
        }
        return "<li class=\"".concat(classes, "\">\n\t\t\t").concat(includeSprite ? this.toImage() : "", "\n\t\t\t").concat(this.toText(), "\n\t\t</li>");
    };
    GeneratedPokemon.prototype.toText = function () {
        return "\n\t\t\t".concat(this.nature ? "<span class=\"nature\">".concat(this.nature, "</span>") : "", "\n\t\t\t").concat(this.name, "\n\t\t\t").concat(this.shiny ? "<span class=\"star\">&starf;</span>" : "", "\n\t\t");
    };
    GeneratedPokemon.prototype.toImage = function () {
        var altText = (this.shiny ? "Shiny " : "") + this.name;
        return "<img src=\"".concat(this.getSpritePath(), "\" alt=\"").concat(altText, "\" title=\"").concat(altText, "\" />");
    };
    GeneratedPokemon.prototype.getSpritePath = function () {
        var path = this.shiny ? PATH_TO_SHINY_SPRITES : PATH_TO_SPRITES;
        var name = this.normalizeName();
        if (this.spriteSuffix) {
            name += "-" + this.spriteSuffix;
        }
        return path + name + SPRITE_EXTENTION;
    };
    GeneratedPokemon.prototype.normalizeName = function () {
        var _a;
        return ((_a = this.baseName) !== null && _a !== void 0 ? _a : this.name)
            .toLowerCase()
            .replaceAll("é", "e")
            .replaceAll("♀", "f")
            .replaceAll("♂", "m")
            .replaceAll(/['.:% -]/g, "");
    };
    return GeneratedPokemon;
}());
function generateNature() {
    return getRandomElement(NATURES);
}
var NATURES = ["Adamant", "Bashful", "Bold", "Brave", "Calm", "Careful", "Docile", "Gentle", "Hardy", "Hasty", "Impish", "Jolly", "Lax", "Lonely", "Mild", "Modest", "Na&iuml;ve", "Naughty", "Quiet", "Quirky", "Rash", "Relaxed", "Sassy", "Serious", "Timid"];
var numberDropdown = document.getElementById("n");
var regionDropdown = document.getElementById("region");
var typeDropdown = document.getElementById("type");
var legendariesCheckbox = document.getElementById("legendaries");
var nfesCheckbox = document.getElementById("nfes");
var spritesCheckbox = document.getElementById("sprites");
var naturesCheckbox = document.getElementById("natures");
var formsCheckbox = document.getElementById("forms");
function generateRandom() {
    return __awaiter(this, void 0, void 0, function () {
        var options, eligiblePokemon, generatedPokemon, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    markLoading(true);
                    options = getOptionsFromForm();
                    persistOptions(options);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, getEligiblePokemon(options)];
                case 2:
                    eligiblePokemon = _a.sent();
                    generatedPokemon = chooseRandom(eligiblePokemon, options);
                    addToHistory(generatedPokemon);
                    displayPokemon(generatedPokemon);
                    return [3, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    displayPokemon(null);
                    return [3, 4];
                case 4:
                    markLoading(false);
                    return [2];
            }
        });
    });
}
function onPageLoad() {
    loadOptions();
    toggleHistoryVisibility();
}
document.addEventListener("DOMContentLoaded", onPageLoad);
function displayPokemon(pokemon) {
    var resultsContainer = document.getElementById("results");
    if (!pokemon) {
        resultsContainer.innerHTML = "An error occurred while generating Pok&eacute;mon.";
    }
    else {
        resultsContainer.innerHTML = toHtml(pokemon);
    }
}
var cachedOptionsJson;
var cachedEligiblePokemon;
function getEligiblePokemon(options) {
    return __awaiter(this, void 0, void 0, function () {
        var optionsJson, response, pokemonInRegion, eligiblePokemon;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    optionsJson = JSON.stringify(options);
                    if (!(cachedOptionsJson == optionsJson)) return [3, 1];
                    return [2, Promise.resolve(cachedEligiblePokemon)];
                case 1: return [4, fetch("dex/" + options.region + ".json")];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        console.error(response);
                        throw Error("Failed to get eligible Pokémon.");
                    }
                    return [4, response.json()];
                case 3:
                    pokemonInRegion = _a.sent();
                    eligiblePokemon = filterByOptions(pokemonInRegion, options);
                    cachedOptionsJson = optionsJson;
                    cachedEligiblePokemon = eligiblePokemon;
                    return [2, eligiblePokemon];
            }
        });
    });
}
function filterByOptions(pokemonInRegion, options) {
    return pokemonInRegion.filter(function (pokemon) {
        if (!options.legendaries && "isLegendary" in pokemon && pokemon.isLegendary) {
            return false;
        }
        if (!options.nfes && "isNfe" in pokemon && pokemon.isNfe) {
            return false;
        }
        if (options.forms && "forms" in pokemon) {
            pokemon.forms = filterByOptions(pokemon.forms, options);
            return pokemon.forms.length > 0;
        }
        if (options.type != "all" && pokemon.types.indexOf(options.type) < 0) {
            return false;
        }
        return true;
    });
}
function chooseRandom(eligiblePokemon, options) {
    var generated = [];
    eligiblePokemon = JSON.parse(JSON.stringify(eligiblePokemon));
    while (eligiblePokemon.length > 0 && generated.length < options.n) {
        var pokemon = removeRandomElement(eligiblePokemon);
        var form = null;
        if (options.forms && pokemon.forms) {
            form = removeRandomElement(pokemon.forms);
            if (form.isMega) {
                eligiblePokemon = removeMegas(eligiblePokemon);
            }
            if (form.isGigantamax) {
                eligiblePokemon = removeGigantamaxes(eligiblePokemon);
            }
        }
        generated.push(GeneratedPokemon.generate(pokemon, form, options));
    }
    return shuffle(generated);
}
function removeMegas(pokemonArray) {
    return pokemonArray.filter(function (pokemon) {
        if (pokemon.forms) {
            pokemon.forms = pokemon.forms.filter(function (form) { return !form.isMega; });
            return pokemon.forms.length > 0;
        }
        else {
            return true;
        }
    });
}
function removeGigantamaxes(pokemonArray) {
    return pokemonArray.filter(function (pokemon) {
        if (pokemon.forms) {
            pokemon.forms = pokemon.forms.filter(function (form) { return !form.isGigantamax; });
            return pokemon.forms.length > 0;
        }
        else {
            return true;
        }
    });
}
function toHtml(pokemon) {
    var includeSprites = spritesCheckbox.checked;
    return "<ol>".concat(pokemon.map(function (p) { return p.toHtml(includeSprites); }).join(""), "</ol>");
}
function getRandomElement(arr) {
    return arr[randomInteger(arr.length)];
}
function removeRandomElement(arr) {
    return arr.splice(randomInteger(arr.length), 1)[0];
}
function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = randomInteger(i + 1);
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
function randomInteger(maxExclusive) {
    return Math.floor(Math.random() * maxExclusive);
}
function markLoading(isLoading) {
    document.getElementById("controls").classList.toggle("loading", isLoading);
}
function setDropdownIfValid(select, value) {
    var option = select.querySelector("[value='" + value + "']");
    if (option) {
        select.value = option.value;
    }
}
function parseBoolean(boolean) {
    return boolean.toLowerCase() == "true";
}
