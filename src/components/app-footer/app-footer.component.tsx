import React, { FunctionComponent } from 'react';

import { localization } from '../../lib/localization';

export const FooterPure: FunctionComponent = (): JSX.Element => (
  <footer className="fdk-footer">
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <p className="fdk-p-footer">
            <a href="https://www.digdir.no/om-oss/personvernerklaering/706" className="align-items-center d-flex">
              {localization.privacy}
              <i className="d-flex fdk-external-link ml-2" />
            </a>

            <a href="https://www.digdir.no/om-oss/personvernerklaering/707" className="align-items-center d-flex">
              {localization.information}
              <i className="d-flex fdk-external-link ml-2" />
            </a>
          </p>
        </div>
        <div className="col-md-4 text-center">
          <span className="uu-invisible" aria-hidden="false">
            Felles Datakatalog.
          </span>
          <p className="fdk-p-footer">{localization.informationText}</p>
        </div>
        <div className="col-md-4 text-right">
          <p className="fdk-p-footer">
            <a href="mailto:fellesdatakatalog@digdir.no">
              <span className="uu-invisible" aria-hidden="false">
                Mailadresse.
              </span>
              {localization.mail}
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export const Footer = FooterPure;
