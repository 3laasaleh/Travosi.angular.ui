import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarOne } from '../../../../components/navbar-one/navbar-one';
import { TermsOne } from '../../../../components/utility/terms-one/terms-one';
import { FooterOne } from '../../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-terms',
  imports: [RouterLink, NavbarOne, TermsOne, FooterOne, SwitcherOne],
  templateUrl: './terms.html',
})
export class Terms {}
