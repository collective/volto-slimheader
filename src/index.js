import { slimHeaderReducer } from './reducers';
import SlimHeaderConfigurationWidget from './widget/SlimHeaderConfigurationWidget';
import SlimHeaderConfigurationForm from './widget/SlimHeaderConfigurationForm';
import { getSlimHeader } from './actions';
import { getItemsByPath } from './utils';
import SlimHeader from './components/SlimHeader';

export {
  SlimHeaderConfigurationWidget,
  SlimHeaderConfigurationForm,
  getSlimHeader,
  SlimHeader,
  getItemsByPath,
};

export default (config) => {
  config.registerComponent({
    name: 'SlimHeaderConfigurationForm',
    component: SlimHeaderConfigurationForm,
  });

  config.widgets.id = {
    ...config.widgets.id,
    slimheader_configuration: SlimHeaderConfigurationWidget,
  };

  config.addonReducers = {
    ...config.addonReducers,
    slimHeader: slimHeaderReducer,
  };

  config.settings.asyncPropsExtenders = [
    ...(config.settings.asyncPropsExtenders ?? []),
    {
      path: '/',
      extend: (dispatchActions) => {
        if (
          dispatchActions.filter(
            (asyncAction) => asyncAction.key === 'slimheader',
          ).length === 0
        ) {
          dispatchActions.push({
            key: 'slimheader',
            promise: ({ location, store: { dispatch } }) =>
              __SERVER__ && dispatch(getSlimHeader()),
          });
        }

        return dispatchActions;
      },
    },
  ];

  return config;
};
