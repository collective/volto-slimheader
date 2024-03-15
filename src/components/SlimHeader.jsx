import React, { useEffect } from 'react';
import { isMatch } from 'lodash';
import { useIntl, defineMessages } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import { getSlimHeader } from '../actions';
import { getItemsByPath } from '../utils';
import { Menu } from 'semantic-ui-react';

const messages = defineMessages({
  slimheader_selected: {
    id: 'slimheader-selected',
    defaultMessage: 'Slim header',
  },
  slimheader_aria: {
    id: 'slimheader-arialabel',
    defaultMessage: 'Slim header',
  },
});

const SlimHeader = ({ pathname, children }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const menuItems = useSelector((state) => state.slimHeader?.result);
  const items = getItemsByPath(menuItems, pathname)?.filter(
    (item) => item.visible,
  );

  useEffect(() => {
    dispatch(getSlimHeader());
  }, [dispatch]);

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
              <UniversalLink
                href={url === '' ? '/' : flattenToAppURL(url)}
                key={i}
                className={`item ${isMenuActive(url) && 'active'}`}
              >
                <span className={item.inEvidence ? 'in-evidence' : ''}>
                  {item.title}
                </span>
                {isMenuActive(url) && (
                  <span className="sr-only">
                    {intl.formatMessage(messages.slimheader_selected)}
                  </span>
                )}
              </UniversalLink>
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
