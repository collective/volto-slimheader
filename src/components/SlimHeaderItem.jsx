/**
 * Single slim header link, registered as `SlimHeaderItem` so themes can replace it.
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-11-10
 */
import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';

const messages = defineMessages({
  slimheader_selected: {
    id: 'slimheader-selected',
    defaultMessage: 'Slim header',
  },
});

const SlimHeaderItem = ({ item, href, active, children }) => {
  const intl = useIntl();

  return (
    <UniversalLink href={href} className={active ? 'item active' : 'item'}>
      {children}
      <span className={item.inEvidence ? 'in-evidence' : ''}>{item.title}</span>
      {active && (
        <span className="sr-only">
          {intl.formatMessage(messages.slimheader_selected)}
        </span>
      )}
    </UniversalLink>
  );
};

export default SlimHeaderItem;
