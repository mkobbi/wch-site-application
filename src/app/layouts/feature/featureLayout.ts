/*******************************************************************************
 * Copyright IBM Corp. 2017
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
import {
    LayoutComponent, RenderingContext, RenderingContextBinding
} from 'ibm-wch-sdk-ng';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { TypeFeatureComponent } from '../../components/feature/typeFeatureComponent';
import {UtilsService} from '../../common/utils/utils.service';

/**
 * @name featureLayout
 * @id feature-layout
 */
@LayoutComponent({
    selector: 'feature-layout'
})
@Component({
  selector: 'app-feature-layout-component',
  templateUrl: './featureLayout.html',
  styleUrls: ['./featureLayout.scss']
})
export class FeatureLayoutComponent extends TypeFeatureComponent implements OnInit, OnDestroy {

    rContext: RenderingContext;
    imagePlacementValue: string;
				useRouterLink: boolean = false;

    readonly HEADLINE_KEY: string = 'featureHeadline';
    readonly DESCRIPTION_KEY: string = 'descriptionOfFeature';
    readonly IMAGE_KEY: string = 'image';
    readonly IMAGE_PLACEMENT_KEY: string = 'imagePlacement';
    readonly IMAGE_SIZE_KEY: string = 'imageSize';
    readonly READ_MORE_KEY: string = 'readMoreLink';


    constructor(private utilsService: UtilsService) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
								this.safeSubscribe(this.onRenderingContext, (renderingContext) => {
            this.rContext = renderingContext;
            this.imagePlacementValue = this.utilsService.getFirstCategoryValue(this.imagePlacement, 'right', true)
        });
								this.safeSubscribe(this.onReadMoreLink, (link) => {
												this.useRouterLink = this.utilsService.useRouterLink(link);
								})
    }

    ngOnDestroy () {
        super.ngOnDestroy();
    }

    isHeaderSet(): boolean {
        return (this.rContext.elements[this.HEADLINE_KEY].value && this.featureHeadline.length > 0);
    }

    isButtonLinkSet(): boolean {
        return !!(this.rContext.elements[this.READ_MORE_KEY].linkURL && this.readMoreLink.linkURL.length > 0);
    }

    getImageSize(): string {
        return this.utilsService.getFirstCategory(this.rContext, this.IMAGE_SIZE_KEY, 'medium', true);
    }

    getImageUrl(): string {
        return this.utilsService.getImageUrl(this.rContext, this.IMAGE_KEY, this.getImageSize());
    }

    getCssClasses() {
        return `feature-img-${this.imagePlacementValue} feature-${this.getImageSize()}`;
    }

}
