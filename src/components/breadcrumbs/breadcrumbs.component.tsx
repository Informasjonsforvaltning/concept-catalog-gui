import React from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { compose } from 'recompose';

import Container from '../container';

import { routeConfig } from '../../app/routeConfig';
import { localization } from '../../lib/localization';
import { getConfig } from '../../config';

import SC from './styled';

const options = {
  disableDefaults: true
};

const config = getConfig();

const Breadcrumb = ({ item }) => {
  const { breadcrumb: label, match: { url: matchUrl } = { url: '' } } = item;
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {config.enableConceptCatalogFrontend && matchUrl.match('^/\\d+$') ? (
        <a href={`${config.conceptCatalogFrontendBaseUri}${matchUrl}`}>
          {label}
        </a>
      ) : (
        <NavLink to={matchUrl}>{label}</NavLink>
      )}
    </>
  );
};

// map & render your breadcrumb components however you want.
// each `breadcrumb` has the props `key`, `location`, and `match` included!
const PureBreadcrumbs = ({ breadcrumbs }) => {
  if (breadcrumbs) {
    return (
      <SC.Breadcrumbs>
        <Container>
          <div className='row'>
            <div className='col-12 px-0'>
              <SC.BreadcrumbsPath>
                <a href={getConfig().registrationHost}>
                  {localization.breadCrumbsAllCatalogs}
                </a>
                <i className='fa fa-angle-right mx-3' />

                {breadcrumbs.map((breadcrumb, index) => (
                  <span key={breadcrumb.key}>
                    {index < breadcrumbs.length - 1 && (
                      <>
                        <Breadcrumb item={breadcrumb} />
                        <i className='fa fa-angle-right mx-3' />
                      </>
                    )}
                    {index === breadcrumbs.length - 1 && breadcrumb.breadcrumb}
                  </span>
                ))}
              </SC.BreadcrumbsPath>
            </div>
          </div>
        </Container>
      </SC.Breadcrumbs>
    );
  }
  return null;
};

export const enhance = compose(withBreadcrumbs(routeConfig, options));

export const Breadcrumbs = enhance(PureBreadcrumbs);
