package org.example.electrostock;

import org.example.electrostock.services.DatabaseSeeder;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ElectroStockApplication {

	public static void main(String[] args) {
		SpringApplication.run(ElectroStockApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(DatabaseSeeder init) {
		return args -> {
			init.seedAllTables();
		};
	}

}
