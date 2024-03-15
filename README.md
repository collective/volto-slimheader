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
