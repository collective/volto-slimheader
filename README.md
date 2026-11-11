# volto-slimheader

Volto addon for a customizable slimheader.
Intended to be used with [collective.volto.slimheader](https://github.com/collective/collective.volto.slimheader).

Install with mrs-developer (see [Volto docs](https://docs.voltocms.com/customizing/add-ons/)) or with:

```bash
yarn add volto-slimheader
```

Created with [voltocli](https://github.com/nzambello/voltocli).

## Usage

To customize the `SlimHeaderConfigurationForm` component, you can now create your own component in your site and replace it using the Volto component registry in your site config file:

```javascript
import MySlimHeaderConfigurationForm from './src/MySlimHeaderConfigurationForm';

config.registerComponent({
  name: 'SlimHeaderConfigurationForm',
  component: MySlimHeaderConfigurationForm,
});
```

### Extra fields

To add fields to the menu item form without replacing it, list them in the add-on settings. Each entry needs an `id`, the key the value is saved under in the menu item; the other properties are passed to the Volto `Field` component (`title`, `description`, `widget`, `choices`, ...), so any registered widget can be used:

```javascript
config.settings['volto-slimheader'].extraFields = [
  {
    id: 'icon',
    title: 'Icon',
    choices: [
      ['users', 'Users'],
      ['file', 'File'],
    ],
  },
];
```

`extraFields` can also be a function, called with `{ intl, menuItem }` and returning the list, for example to translate the labels.

No backend change is needed: the values are stored with the rest of the menu item.

### Custom menu item

Each link of the `SlimHeader` component is rendered by the `SlimHeaderItem` component, looked up in the Volto component registry. Replace it to change the markup or to display the extra fields:

```javascript
import MySlimHeaderItem from './src/MySlimHeaderItem';

config.registerComponent({
  name: 'SlimHeaderItem',
  component: MySlimHeaderItem,
});
```

The component receives these props:

- `item`: the menu item as saved in the control panel, extra fields included;
- `href`: the link URL, already flattened;
- `active`: `true` when the link matches the current path.

To only add something to the default link, wrap the default component: its `children` are rendered inside the link, before the title.

```javascript
import { SlimHeaderItem } from 'volto-slimheader';

const MySlimHeaderItem = (props) => (
  <SlimHeaderItem {...props}>
    {props.item.icon && <span className={`icon-${props.item.icon}`} />}
  </SlimHeaderItem>
);
```
