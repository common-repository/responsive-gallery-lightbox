<?php

return array(
	array(
		'type'      => 'group',
		'repeating' => true,
		'length'    => 1,
		'sortable'  => true,
		'name'      => 'info',
		'priority'  => 'high',
		'title'     => __('Gallery', 'vp_textdomain'),
		'fields'    => array(
		
		
		
										
			array(
					'type' => 'notebox',
					'name' => 'nb_1',
					'label' => __('Author Comment', 'vp_textdomain'),
					'description' => __('If you want to enable all awesome features, simply buy pro version here <a href="http://demo.wpvalueclub.com/responsive-gallery-lightbox/">Responsive Gallery Lightbox</a>', 'vp_textdomain'),
					'status' => 'info',
					),		
					
			array(
					'type' => 'upload',
					'name' => 'image',
					'label' => __('Thumbnail Image', 'vp_textdomain'),
				),
				
				
			array(
					'type' => 'textbox',
					'name' => 'url',
					'label' => __('Insert Image or Video URL', 'vp_textdomain'),
					'description' => __('You can insert youtube or vimeo video url', 'vp_textdomain'),
					'validation' => 'url',
				),
				
			array(
				'type'  => 'textbox',
				'name'  => 'title',
				'label' => __('Title', 'vp_textdomain'),
			),
			
			array(
				'type'  => 'textarea',
				'name'  => 'description',
				'label' => __('Description', 'vp_textdomain'),
			),
			
			

		),
	),
);

/**
 * EOF
 */