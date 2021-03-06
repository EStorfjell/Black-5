class Shop {
    constructor(game, hero) {
        Object.assign(this, { game, hero });

        this.sword = this.hero.sword;
        this.crossbow = this.hero.crossbow;
        this.pistol = this.hero.pistol;
        this.shotgun = this.hero.shotgun;

        this.x = 0;
        this.y = 0;
        this.width = game.surfaceWidth;
        this.height = game.surfaceHeight;


        this.backgroundColor = "White";
        this.textColor = "Black";

        this.initialize(this);
    }

    initialize(that) {
        $("#shop").keydown(function(event) {
            if (event.code == "KeyT") {
                that.toggle();
            }
            console.log("shop key event");
        });

        $("#swordButton").click(function() {
            if ($("swordTab").css("display") != "block") {
                if ($("#crossbowTab").css("display") != "none") {
                    $("#crossbowTab").css("display", "none");
                }
                if ($("#pistolTab").css("display") != "none") {
                    $("#pistolTab").css("display", "none");
                }
                if ($("#shotgunTab").css("display") != "none") {
                    $("#shotgunTab").css("display", "none");
                }
                $("#swordTab").css("display", "block");
            }
        });
    
        $("#crossbowButton").click(function() {
            if ($("crossbowTab").css("display") != "block") {
                if ($("#swordTab").css("display") != "none") {
                    $("#swordTab").css("display", "none");
                }
                if ($("#pistolTab").css("display") != "none") {
                    $("#pistolTab").css("display", "none");
                }
                if ($("#shotgunTab").css("display") != "none") {
                    $("#shotgunTab").css("display", "none");
                }
                $("#crossbowTab").css("display", "block");
            }
        });
    
        $("#pistolButton").click(function() {
            if ($("pistolTab").css("display") != "block") {
                if ($("#swordTab").css("display") != "none") {
                    $("#swordTab").css("display", "none");
                }
                if ($("#crossbowTab").css("display") != "none") {
                    $("#crossbowTab").css("display", "none");
                }
                if ($("#shotgunTab").css("display") != "none") {
                    $("#shotgunTab").css("display", "none");
                }
                $("#pistolTab").css("display", "block");
            }
        });
    
        $("#shotgunButton").click(function() {
            if ($("shotgunTab").css("display") != "block") {
                if ($("#swordTab").css("display") != "none") {
                    $("#swordTab").css("display", "none");
                }
                if ($("#crossbowTab").css("display") != "none") {
                    $("#crossbowTab").css("display", "none");
                }
                if ($("#pistolTab").css("display") != "none") {
                    $("#pistolTab").css("display", "none");
                }
                $("#shotgunTab").css("display", "block");
            }
        });

        $("#swordAttackDamageUpgradeButton").click(function() {
            that.sword.upgradeAttackDamage();
            that.updateValues();
        });

        $("#crossbowAttackDamageUpgradeButton").click(function() {
            that.crossbow.upgradeAttackDamage();
            that.updateValues();
        });

        
        $("#pistolAttackDamageUpgradeButton").click(function() {
            that.pistol.upgradeAttackDamage();
            that.updateValues();
        });

        $("#shotgunAttackDamageUpgradeButton").click(function() {
            that.shotgun.upgradeAttackDamage();
            that.updateValues();
        });

        $("#crossbowReloadSpeedUpgradeButton").click(function() {
            that.crossbow.upgradeReloadSpeed();
            that.updateValues();
        });

        $("#pistolReloadSpeedUpgradeButton").click(function() {
            that.pistol.upgradeReloadSpeed();
            that.updateValues();
        });

        $("#shotgunReloadSpeedUpgradeButton").click(function() {
            that.shotgun.upgradeReloadSpeed();
            that.updateValues();
        });

        $("#crossbowAmmoButton").click(function() {
            that.crossbow.addAmmo();
            that.updateValues();
        });

        $("#pistolAmmoButton").click(function() {
            that.pistol.addAmmo();
            that.updateValues();
        });

        $("#shotgunAmmoButton").click(function() {
            that.shotgun.addAmmo();
            that.updateValues();
        });

        $("#pistolBuyButton").click(function() {
            that.pistol.buy();
            that.updateValues();
        });

        $("#shotgunBuyButton").click(function() {
            that.shotgun.buy();
            that.updateValues();
        });
    }

    update() {
    }

    updateValues() {
        $("#currentExperience").html("" + this.hero.exp.getExp());

        $(".swordCost").html("" + this.sword.weaponCost);
        $("#swordAttackDamage").html("" + this.sword.attackDamage);
        $("#swordAttackDamageMeter").prop("value", "" + this.sword.attackDamage);
        $("#swordAttackDamageMeter").prop("max", "" + this.sword.maxAttackDamage);
        $(".swordAttackDamageUpgradeCost").html("" + this.sword.attackDamageUpgradeCost);
    
        $(".crossbowCost").html("" + this.crossbow.weaponCost);
        $("#crossbowAttackDamage").html("" + this.crossbow.attackDamage);
        $("#crossbowAttackDamageMeter").prop("value", "" + this.crossbow.attackDamage);
        $("#crossbowAttackDamageMeter").prop("max", "" + this.crossbow.maxAttackDamage);
        $(".crossbowAttackDamageUpgradeCost").html("" + this.crossbow.attackDamageUpgradeCost);
        $(".crossbowReloadSpeedUpgradeCost").html("" + this.crossbow.reloadSpeedUpgradeCost);
        $("#crossbowReloadSpeed").html("" + this.crossbow.reloadSpeed);
        $("#crossbowReloadSpeedMeter").prop("value", "" + this.crossbow.reloadSpeed);
        $("#crossbowReloadSpeedMeter").prop("max", "" + this.crossbow.maxReloadSpeed);
        $("#crossbowAmmo").html("" + this.crossbow.ammo);
        $("#crossbowAmmoMeter").prop("value", "" + this.crossbow.ammo);
        $("#crossbowAmmoMeter").prop("max", "" + this.crossbow.maxAmmo);
        $(".crossbowAmmoUnit").html("" + this.crossbow.getAmmoUnit());
        $(".crossbowAmmoUnitCost").html("" + this.crossbow.ammoUnitCost);
    
        $(".pistolCost").html("" + this.pistol.weaponCost);
        $("#pistolAttackDamage").html("" + this.pistol.attackDamage);
        $("#pistolAttackDamageMeter").prop("value", "" + this.pistol.attackDamage);
        $("#pistolAttackDamageMeter").prop("max", "" + this.pistol.maxAttackDamage);
        $(".pistolAttackDamageUpgradeCost").html("" + this.pistol.attackDamageUpgradeCost);
        $(".pistolReloadSpeedUpgradeCost").html("" + this.pistol.reloadSpeedUpgradeCost);
        $("#pistolReloadSpeed").html("" + this.pistol.reloadSpeed);
        $("#pistolReloadSpeedMeter").prop("value", "" + this.pistol.reloadSpeed);
        $("#pistolReloadSpeedMeter").prop("max", "" + this.pistol.maxReloadSpeed);
        $("#pistolAmmo").html("" + this.pistol.ammo);
        $("#pistolAmmoMeter").prop("value", "" + this.pistol.ammo);
        $("#pistolAmmoMeter").prop("max", "" + this.pistol.maxAmmo);
        $(".pistolAmmoUnit").html("" + this.pistol.getAmmoUnit());
        $(".pistolAmmoUnitCost").html("" + this.pistol.ammoUnitCost);
    
        $(".shotgunCost").html("" + this.shotgun.weaponCost);
        $("#shotgunAttackDamage").html("" + this.shotgun.attackDamage);
        $("#shotgunAttackDamageMeter").prop("value", "" + this.shotgun.attackDamage);
        $("#shotgunAttackDamageMeter").prop("max", "" + this.shotgun.maxAttackDamage);
        $(".shotgunAttackDamageUpgradeCost").html("" + this.shotgun.attackDamageUpgradeCost);
        $(".shotgunReloadSpeedUpgradeCost").html("" + this.shotgun.reloadSpeedUpgradeCost);
        $("#shotgunReloadSpeed").html("" + this.shotgun.reloadSpeed);
        $("#shotgunReloadSpeedMeter").prop("value", "" + this.shotgun.reloadSpeed);
        $("#shotgunReloadSpeedMeter").prop("max", "" + this.shotgun.maxReloadSpeed);
        $("#shotgunAmmo").html("" + this.shotgun.ammo);
        $("#shotgunAmmoMeter").prop("value", "" + this.shotgun.ammo);
        $("#shotgunAmmoMeter").prop("max", "" + this.shotgun.maxAmmo);
        $(".shotgunAmmoUnit").html("" + this.shotgun.getAmmoUnit());
        $(".shotgunAmmoUnitCost").html("" + this.shotgun.ammoUnitCost);

        $("#swordAttackDamageUpgradeButton").prop("disabled", !this.sword.canUpgradeAttackDamage());
        $("#crossbowAttackDamageUpgradeButton").prop("disabled", !this.crossbow.canUpgradeAttackDamage());
        $("#pistolAttackDamageUpgradeButton").prop("disabled", !this.pistol.canUpgradeAttackDamage());
        $("#shotgunAttackDamageUpgradeButton").prop("disabled", !this.shotgun.canUpgradeAttackDamage());

        $("#crossbowReloadSpeedUpgradeButton").prop("disabled", !this.crossbow.canUpgradeReloadSpeed());
        $("#pistolReloadSpeedUpgradeButton").prop("disabled", !this.pistol.canUpgradeReloadSpeed());
        $("#shotgunReloadSpeedUpgradeButton").prop("disabled", !this.shotgun.canUpgradeReloadSpeed());

        $("#crossbowAmmoButton").prop("disabled", !this.crossbow.canAddAmmo());
        $("#pistolAmmoButton").prop("disabled", !this.pistol.canAddAmmo());
        $("#shotgunAmmoButton").prop("disabled", !this.shotgun.canAddAmmo());

        $("#pistolBuyButton").prop("disabled", !this.pistol.canBuy());
        $("#shotgunBuyButton").prop("disabled", !this.shotgun.canBuy());
    }

    draw(ctx) {
    }

    open() {
        this.updateValues();

        $("#shop").css("display", "block");

        $("#swordTab").css("display", "block");
        $("#crossbowTab").css("display", "none");
        $("#pistolTab").css("display", "none");
        $("#shotgunTab").css("display", "none");

        $("#shop").focus();
    }

    close() {
        $("#shop").css("display", "none");

        $("#gameWorld").focus();
    }

    toggle() {
        if (this.game.shopIsOpen) {
            this.close();
        } else {
            this.open();
        }
        this.game.shopIsOpen = !this.game.shopIsOpen;
    }
}