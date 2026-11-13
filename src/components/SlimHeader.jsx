import React, { useEffect, useState } from 'react';
import { isMatch } from 'lodash';
import { useIntl, defineMessages } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import Component from '@plone/volto/components/theme/Component/Component';
import { getSlimHeader } from '../actions';
import { getItemsByPath } from '../utils';
import { Menu } from 'semantic-ui-react';

const messages = defineMessages({
  slimheader_aria: {
    id: 'slimheader-arialabel',
    defaultMessage: 'Slim header',
  },
});

const getVisibleItems = (menuItems, pathname) =>
  getItemsByPath(menuItems, pathname ?? '')?.filter((item) => item.visible);

const SlimHeader = ({ pathname, children }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.slimHeader?.loadingResults);
  const menuItems = useSelector((state) => state.slimHeader?.result);
  const [items, setItems] = useState(() =>
    getVisibleItems(menuItems, pathname),
  );

  useEffect(() => {
    if (!menuItems && !loading) {
      dispatch(getSlimHeader());
    }
  }, []);

  useEffect(() => {
    setItems(getVisibleItems(menuItems, pathname));
  }, [pathname, menuItems]);

  const isMenuActive = (itemUrl = '') => {
    const url = flattenToAppURL(itemUrl);
    const currrentPath = pathname ?? '';

    return (
      (url === '' && (currrentPath === '/' || currrentPath === '')) ||
      (url !== '' && isMatch(currrentPath.split('/'), url.split('/')))
    );
  };

  return (
    items?.length > 0 && (
      <nav
        className="slimHeader"
        role="navigation"
        aria-label={intl.formatMessage(messages.slimheader_aria)}
      >
        <Menu stackable pointing secondary>
          {items.map((item, i) => {
            let url = item.href || item.linkUrl?.[0]?.['@id'] || '';

            return (
              <Component
                componentName="SlimHeaderItem"
                key={i}
                item={item}
                href={url === '' ? '/' : flattenToAppURL(url)}
                active={isMenuActive(url)}
              />
            );
          })}
          {children && children}
        </Menu>
      </nav>
    )
  );
};

SlimHeader.propTypes = {};

export default SlimHeader;
