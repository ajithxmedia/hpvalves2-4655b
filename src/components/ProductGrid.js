import React from 'react';
import _ from 'lodash';

import {classNames, toStyleObj, withPrefix} from '../utils';
import ProductItem from './ProductItem';
import SectionActions from './SectionActions';

export default class ProductGrid extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let align_x = _.get(section, 'align', null) || 'center';
        let padding_top = _.get(section, 'padding_top', null) || 'medium';
        let padding_bottom = _.get(section, 'padding_bottom', null) || 'medium';
        let bg_color = _.get(section, 'background_color', null) || 'none';
        let bg_img_opacity_pct = _.get(section, 'background_image_opacity', null) || 100;
        let bg_img_opacity = bg_img_opacity_pct * 0.01;
        let bg_img_size = _.get(section, 'background_image_size', null) || 'cover';
        let bg_img_position = _.get(section, 'background_image_position', null) || 'center center';
        let bg_img_repeat = _.get(section, 'background_image_repeat', null) || 'no-repeat';
        let grid_gap_x = _.get(section, 'grid_gap_horiz', null) || 'medium';
        let grid_gap_y = _.get(section, 'grid_gap_vert', null) || 'medium';
        let class_name = _.get(section, 'class', null);
        console.log(section)
        return (
            
            <section className={classNames('section',class_name, {'has-border': _.get(section, 'has_border', null), 'has-cover': _.get(section, 'background_image', null), 'bg-none': bg_color === 'none', 'bg-primary': bg_color === 'primary', 'bg-secondary': bg_color === 'secondary', 'pt-4': padding_top === 'small', 'pt-6': (padding_top === 'medium') || (padding_top === 'large'), 'pt-md-7': padding_top === 'large', 'pb-4': padding_bottom === 'small', 'pb-6': (padding_bottom === 'medium') || (padding_bottom === 'large'), 'pb-md-7': padding_bottom === 'large'})}>
            	{_.get(section, 'background_image', null) && (
            	<div className="cover-img" style={toStyleObj('background-image: url(\'' + withPrefix(_.get(section, 'background_image', null)) + '\'); opacity: ' + bg_img_opacity + '; background-size: ' + bg_img_size + '; background-repeat: ' + bg_img_repeat + '; background-position: ' + bg_img_position)}/>
            	)}
            	{(_.get(section, 'title', null) || _.get(section, 'subtitle', null)) && (
            	<div className={classNames('container', 'container--medium', {'mb-5': (grid_gap_y === 'small') || (grid_gap_y === 'medium'), 'mb-4': grid_gap_y === 'large', 'text-center': align_x === 'center', 'text-right': align_x === 'right'})}>
            		{_.get(section, 'subtitle', null) && (
            		<div className="section__subtitle">{_.get(section, 'subtitle', null)}</div>
            		)}
            		{_.get(section, 'title', null) && (
            		<h2 className="section__title mt-0">{_.get(section, 'title', null)}</h2>
            		)}
            	</div>
            	)}

                <div className="container">
                    <div className={classNames('grid','grid-gap-small')}>
                        {/*Left Container  */}
                        <div className={classNames('cell-12', 'cell-md-3','cell-lg-3','cell-sm-12','my-1')}>
                            <div class="tab-sections">
                                <ul class="tab_container">
                                    {_.map(_.get(section, 'tabs_items', null), (item, item_idx) => (
                                        <li>{_.get(item, 'label', null)}</li>           
                                    ))}
                                </ul>
                            </div>
                            
                        </div>
                        {/* Right Container */}
                        <div className={classNames('cell-12', 'cell-md-9','cell-lg-9','cell-sm-12','my-1')}>
                            {_.get(section, 'product_grid_items', null) && (
                                <div className="container">
                                    <div className={classNames('grid', {'grid-gap-small': grid_gap_x === 'small', 'grid-gap-large': grid_gap_x === 'large'})}>
                                        {_.map(_.get(section, 'product_grid_items', null), (item, item_idx) => (
                                            <ProductItem key={item_idx} {...this.props} section={section} item={item} />
                                        ))}
                                    </div>
                                </div>
                                )}
                                {_.get(section, 'actions', null) && (
                                <div className={classNames('container', 'container--medium', {'mt-4': grid_gap_y !== 'large', 'mt-3': grid_gap_y === 'large'})}>
                                    <div className={classNames('section__actions', 'btn-group', {'justify-center': align_x === 'center', 'justify-end': align_x === 'right'})}>
                                        <SectionActions {...this.props} actions={_.get(section, 'actions', null)} />
                                    </div>
                                </div>
                                )}
                        </div>

                    </div>
                </div>            	
            </section>
        );
    }
}
