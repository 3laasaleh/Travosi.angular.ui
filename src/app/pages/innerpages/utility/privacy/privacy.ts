import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarOne } from '../../../../components/navbar-one/navbar-one';
import { PrivacyOne } from '../../../../components/utility/privacy-one/privacy-one';
import { FooterOne } from '../../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-privacy',
  imports: [RouterLink, NavbarOne, PrivacyOne, FooterOne, SwitcherOne],
  templateUrl: './privacy.html',
})
export class Privacy {}
