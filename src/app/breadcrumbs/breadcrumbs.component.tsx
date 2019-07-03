import React from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { compose } from 'recompose';

import { routeConfig } from '../routeConfig';
import { localization } from '../../lib/localization';
import { getConfig } from '../../config';

const options = {
  disableDefaults: true,
  excludePaths: ['']
};

// map & render your breadcrumb components however you want.
// each `breadcrumb` has the props `key`, `location`, and `match` included!
const PureBreadcrumbs = ({ breadcrumbs }) => {
  if (breadcrumbs) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 px-0">
            <p className="fdk-p-path">
              <a href={getConfig().registrationHost.host}>{localization.breadCrumbsAllCatalogs}</a>
              <i className="fa fa-angle-right mx-3" />

              {breadcrumbs.map((breadcrumb, index) => (
                <span key={breadcrumb.key}>
                  {index < breadcrumbs.length - 1 && (
                    <>
                      <NavLink to={breadcrumb.match.url}>{breadcrumb.breadcrumb}</NavLink>
                      <i className="fa fa-angle-right mx-3" />
                    </>
                  )}
                  {index === breadcrumbs.length - 1 && breadcrumb.breadcrumb}
                </span>
              ))}
            </p>
            <p>
              <a className="" href={getConfig().registrationHost.host}>
                <i className="fa fa-arrow-left mr-2" />
                {localization.breadCrumbsBackToCatalog}
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const enhance = compose(withBreadcrumbs(routeConfig, options));

export const Breadcrumbs = enhance(PureBreadcrumbs);
