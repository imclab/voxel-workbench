// Generated by CoffeeScript 1.6.3
(function() {
  var AmorphousRecipe, CraftingThesaurus, Inventory, InventoryWindow, ItemPile, Modal, PositionalRecipe, Recipe, RecipeLocator, WorkbenchDialog, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Modal = require('voxel-modal');

  Inventory = require('inventory');

  InventoryWindow = require('inventory-window');

  ItemPile = require('itempile');

  _ref = require('craftingrecipes'), Recipe = _ref.Recipe, AmorphousRecipe = _ref.AmorphousRecipe, PositionalRecipe = _ref.PositionalRecipe, CraftingThesaurus = _ref.CraftingThesaurus, RecipeLocator = _ref.RecipeLocator;

  WorkbenchDialog = (function(_super) {
    __extends(WorkbenchDialog, _super);

    function WorkbenchDialog(game, opts) {
      var crDiv, craftCont, resultCont, _ref1, _ref2, _ref3,
        _this = this;
      this.game = game;
      if (opts == null) {
        opts = {};
      }
      this.playerInventory = (function() {
        if ((_ref1 = opts.playerInventory) != null) {
          return _ref1;
        } else {
          throw 'voxel-workbench requires "playerInventory" set to inventory instance';
        }
      })();
      this.registry = (function() {
        if ((_ref2 = opts.registry) != null) {
          return _ref2;
        } else {
          throw 'voxel-workbench requires "registry" set to voxel-registry instance';
        }
      })();
      this.getTexture = (_ref3 = opts.getTexture) != null ? _ref3 : function(itemPile) {
        return _this.game.materials.texturePath + _this.registry.getItemProps(itemPile.item).itemTexture + '.png';
      };
      this.playerIW = new InventoryWindow({
        width: 10,
        inventory: this.playerInventory,
        getTexture: this.getTexture
      });
      this.craftInventory = new Inventory(9);
      this.craftInventory.on('changed', function() {
        return _this.updateCraftingRecipe();
      });
      this.craftIW = new InventoryWindow({
        width: 3,
        inventory: this.craftInventory,
        getTexture: this.getTexture
      });
      this.resultInventory = new Inventory(1);
      this.resultIW = new InventoryWindow({
        inventory: this.resultInventory,
        getTexture: this.getTexture,
        allowDrop: false
      });
      this.resultIW.on('pickup', function() {
        return _this.tookCraftingOutput();
      });
      this.dialog = document.createElement('div');
      this.dialog.style.border = '6px outset gray';
      this.dialog.style.visibility = 'hidden';
      this.dialog.style.position = 'absolute';
      this.dialog.style.top = '20%';
      this.dialog.style.left = '30%';
      this.dialog.style.zIndex = 1;
      this.dialog.style.backgroundImage = 'linear-gradient(rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) 100%)';
      document.body.appendChild(this.dialog);
      crDiv = document.createElement('div');
      crDiv.style.marginLeft = '30%';
      crDiv.style.marginBottom = '10px';
      craftCont = this.craftIW.createContainer();
      resultCont = this.resultIW.createContainer();
      resultCont.style.marginLeft = '30px';
      resultCont.style.marginTop = '15%';
      crDiv.appendChild(craftCont);
      crDiv.appendChild(resultCont);
      this.dialog.appendChild(crDiv);
      this.dialog.appendChild(document.createElement('br'));
      this.dialog.appendChild(this.playerIW.createContainer());
      WorkbenchDialog.__super__.constructor.call(this, game, {
        element: this.dialog
      });
    }

    return WorkbenchDialog;

  })(Modal);

  module.exports = function(game, opts) {
    return new WorkbenchDialog(game, opts);
  };

}).call(this);
