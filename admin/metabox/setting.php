<?php

return array(
	array(
		'type'      => 'group',
		'repeating' => false,
		'length'    => 1,
		'sortable'  => true,
		'name'      => 'settings',
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
					'type' => 'radiobutton',
					'name' => 'caption',
					'label' => __('Show Gallery Caption', 'vp_textdomain'),
					'items' => array(
						array(
							'value' => 'true',
							'label' => __('Yes', 'vp_textdomain'),
							),
						array(
								'value' => 'false',
								'label' => __('No', 'vp_textdomain'),
								

							),

						),
								'default' => array(
								'true',
								),
					),
				
				array(
				'type' => 'radiobutton',
					'name' => 'description',
					'label' => __('Show Gallery Description', 'vp_textdomain'),
					'items' => array(
						array(
							'value' => 'true',
							'label' => __('Yes', 'vp_textdomain'),
						),
						array(
								'value' => 'false',
								'label' => __('No', 'vp_textdomain'),
															
				),
					),
					
								'default' => array(
								'true',
								),
				),
				
				
			array(
					'type' => 'textbox',
					'name' => 'width',
					'label' => __('Thumbnail Image Width', 'vp_textdomain'),
					'description' => __('(Pro Only)', 'vp_textdomain'),
					'default' => '150',
				),	

			array(
					'type' => 'textbox',
					'name' => 'height',
					'label' => __('Thumbnail Image Height', 'vp_textdomain'),
					'description' => __('(Pro Only)', 'vp_textdomain'),
					'default' => '130',
				),
				
				
				
							array(
					'type' => 'slider',
					'name' => 'speed',
					'label' => __('Slider Speed', 'vp_textdomain'),
					'description' => __('(Pro Only)', 'vp_textdomain'),
					'min' => '100',
					'max' => '2000',
					'step' => '100',
					'default' => '800',
				),	
				
				
			 array(
					'type' => 'slider',
					'name' => 'margin_right',
					'label' => __('Thumbnail Image Right Space', 'vp_textdomain'),
					'description' => __('(Pro Only)', 'vp_textdomain'),
					'min' => '-10',
					'max' => '50',
					'step' => '1',
					'default' => '-6',
				),	
				
			array(
					'type' => 'slider',
					'name' => 'margin_bottom',
					'label' => __('Thumbnail Image Bottom Space', 'vp_textdomain'),
					'description' => __('(Pro Only)', 'vp_textdomain'),
					'min' => '10',
					'max' => '100',
					'step' => '1',
					'default' => '22',
				),


				
			
			

		),
	),
);

/**
 * EOF
 */