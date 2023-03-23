/*
 * Copyright 2012-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.yakootah;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableAutoConfiguration
@EntityScan("com.yakootah.domain")
@EnableTransactionManagement
//@ImportResource("classpath*:spring.xml")
//@PropertySources(
//{ @PropertySource("classpath:ui.properties"), @PropertySource("classpath:sql.properties") })
@ComponentScan
public class MyTracker extends SpringBootServletInitializer
{

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application)
	{
		return application.sources(MyTracker.class);
	}

	public static void main(String[] args) throws Exception
	{
		SpringApplication.run(MyTracker.class, args);
	}
	
	/*
	 * @Autowired private Environment environment;
	 * 
	 * @Bean public LocalSessionFactoryBean sessionFactory() {
	 * LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
	 * sessionFactory.setDataSource(dataSource()); //
	 * sessionFactory.setPackagesToScan(new String[]{"com.example.myapp.model"}); //
	 * sessionFactory.setHibernateProperties(hibernateProperties()); return
	 * sessionFactory; }
	 * 
	 * @Bean public DataSource dataSource() { DriverManagerDataSource dataSource =
	 * new DriverManagerDataSource();
	 * dataSource.setDriverClassName(environment.getProperties().getProperty(
	 * "spring.datasource.driver-class-name"));
	 * dataSource.setUrl(environment.getRequiredProperty("spring.datasource.url"));
	 * dataSource.setUsername(environment.getRequiredProperty(
	 * "spring.datasource.username"));
	 * dataSource.setPassword(environment.getRequiredProperty(
	 * "spring.datasource.password")); return dataSource; }
	 */

}
