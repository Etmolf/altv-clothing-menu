import * as alt from 'alt';
import * as game from 'natives';
import * as NativeUI from './includes/NativeUI/NativeUI.js';

const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;

const player = alt.Player.local;

const menu = new Menu("Clothing", "", new Point(50, 50));

const clothing = [
    {
        label: "Masks",
        componentId: 1
    },
    {
        label: "Hair",
        componentId: 2
    },
    {
        label: "Torso",
        componentId: 3
    },
    {
        label: "Legs",
        componentId: 4
    },
    {
        label: "Bags",
        componentId: 5
    },
    {
        label: "Shoes",
        componentId: 6
    },
    {
        label: "Accessories",
        componentId: 7
    },
    {
        label: "Undershirts",
        componentId: 8
    },
    {
        label: "Body Armors",
        componentId: 9
    },
    {
        label: "Decals",
        componentId: 10
    },
    {
        label: "Tops",
        componentId: 11
    }
]

const props = [
    {
        label: "Hats",
        componentId: 0
    },
    {
        label: "Glasses",
        componentId: 1
    },
    {
        label: "Ears",
        componentId: 2
    },
    {
        label: "Watches",
        componentId: 6
    },
    {
        label: "Bracelets",
        componentId: 7
    }
]

clothing.forEach(componentData => {
    const subMenuItem = new UIMenuItem(componentData.label, "")
    const subMenu = new Menu(componentData.label + " Menu", "", new Point(50, 50));

    subMenu.Visible = false;
    subMenu.GetTitle().Scale = 0.9;

    menu.AddSubMenu(subMenu, subMenuItem);

    const drawablesItem = new NativeUI.UIMenuAutoListItem(componentData.label, "", 0, game.getNumberOfPedDrawableVariations(player.scriptID, componentData.componentId) - 1);
    const texturesItem = new NativeUI.UIMenuAutoListItem("Texture", "", 0, 999);

    subMenu.AddItem(drawablesItem);
    subMenu.AddItem(texturesItem);

    subMenu.ItemSelect.on(() => {
        const drawableId = drawablesItem.SelectedValue;
        const textureId = texturesItem.SelectedValue;

        game.setPedComponentVariation(player.scriptID, componentData.componentId, drawableId, textureId, 0);
    })
})

props.forEach(componentData => {
    const subMenuItem = new UIMenuItem(componentData.label, "")
    const subMenu = new Menu(componentData.label + " Menu", "", new Point(50, 50));

    subMenu.Visible = false;
    subMenu.GetTitle().Scale = 0.9;

    menu.AddSubMenu(subMenu, subMenuItem);

    const drawablesItem = new NativeUI.UIMenuAutoListItem(componentData.label, "", 0, game.getNumberOfPedPropDrawableVariations(player.scriptID, componentData.componentId) - 1);
    const texturesItem = new NativeUI.UIMenuAutoListItem("Texture", "", 0, 999);

    subMenu.AddItem(drawablesItem);
    subMenu.AddItem(texturesItem);

    subMenu.ItemSelect.on(() => {
        const drawableId = drawablesItem.SelectedValue;
        const textureId = texturesItem.SelectedValue;

        game.setPedPropIndex(player.scriptID, componentData.componentId, drawableId, textureId, true, 1);
    })
})

alt.on('keyup', (key) => {
    if (key === 0x71) { //F2 KEY
        if (menu.Visible)
            menu.Close(true);
        else
            menu.Open();
    }
});



