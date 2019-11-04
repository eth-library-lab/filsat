import {Component, h, Prop, State} from '@stencil/core';

import * as icons  from 'simple-icons';

interface SimpleIcon {
  svg: string;
  slug: string;
}

@Component({
  tag: 'app-language',
  styleUrl: 'app-language.scss',
  shadow: true
})
export class AppAvatar {

  @Prop()
  language: string;

  @State()
  private icon: SimpleIcon;

  async componentWillLoad() {
    this.icon = icons.default.get(this.language);
  }

  render() {
    if (this.icon) {
      return <div innerHTML={this.icon.svg} class={`language ${this.icon.slug}`}></div>
    } else {
      return undefined;
    }

  }

}
