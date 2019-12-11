import React, { FunctionComponent } from 'react';
import './app-header.scss';
import { DropdownToggle, DropdownItem, DropdownMenu, UncontrolledDropdown } from 'reactstrap';
import { getConfig } from '../../config';
import { getUserName, logout } from '../../auth/auth-service';

export const HeaderPure: FunctionComponent = (): JSX.Element => (
  <header>
    <div>
      <a id="focus-element" className="uu-invisible" href={`${'location.pathname'}#content`} aria-hidden="true">
        focus-element
      </a>
    </div>
    <div id="skip-link-wrap">
      <a id="skip-link" href={`${location.pathname}#content`}>
        Hopp til hovedinnhold
      </a>
    </div>
    <div className="fdk-header">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <a title="Link til Felles datakatalog" href={getConfig().registrationHost}>
              <span className="uu-invisible" aria-hidden="false" />
              <img className="fdk-logo" src="./img/logo-registrering.svg" alt="Logo for Felles datakatalog" />
            </a>
          </div>

          <div className="col-6 d-flex align-items-center fdk-header-text_items justify-content-end">
            <UncontrolledDropdown className="fdk-user-button">
              <DropdownToggle className="fdk-button-account fdk-user" color="link" caret>
                {getUserName()}
              </DropdownToggle>
              <DropdownMenu right className="fdk-dropdownmenu">
                <DropdownItem onClick={logout}>Logg ut</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export const Header = HeaderPure;
