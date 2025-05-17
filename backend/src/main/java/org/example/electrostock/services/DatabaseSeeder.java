package org.example.electrostock.services;

import org.example.electrostock.constants.Roles;
import org.example.electrostock.entities.*;
import org.example.electrostock.repositories.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DatabaseSeeder {
    private final UserRoleRepository userRoleRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ComponentRepository componentRepository;
    private final WareStoreRepository wareStoreRepository;

    public DatabaseSeeder(
            UserRoleRepository userRoleRepository,
            RoleRepository roleRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            ComponentRepository componentRepository,
            WareStoreRepository wareStoreRepository
    ) {
        this.userRoleRepository = userRoleRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.componentRepository = componentRepository;
        this.wareStoreRepository = wareStoreRepository;
    }

    public void seedAllTables() {
        seedRole();
        seedSuppliers();
        seedWarestores();
        seedComponents();
    }

    private void seedRole() {
        if(roleRepository.count() == 0) {
            RoleEntity supplier = RoleEntity
                    .builder()
                    .name(Roles.Supplier)
                    .build();
            roleRepository.save(supplier);
            RoleEntity user = RoleEntity
                    .builder()
                    .name(Roles.User)
                    .build();
            roleRepository.save(user);
        }
    }

//    private void seedSuppliers() {
//        if(userRepository.count() == 0) {
//            var user = UserEntity
//                    .builder()
//                    .email("supplier@gmail.com")
//                    .firstName("Supplier")
//                    .lastName("Supplier")
//                    .password(passwordEncoder.encode("123456"))
//                    .build();
//            userRepository.save(user);
//            var role = roleRepository.findByName(Roles.Supplier);
//            var ur = UserRoleEntity
//                    .builder()
//                    .role(role)
//                    .user(user)
//                    .build();
//            userRoleRepository.save(ur);
//        }
//    }

    private void seedSuppliers() {
        if (userRepository.count() == 0) {
            var user = UserEntity
                    .builder()
                    .email("supplier@gmail.com")
                    .firstName("Supplier")
                    .lastName("Supplier")
                    .password(passwordEncoder.encode("123456"))
                    .build();
            user = userRepository.saveAndFlush(user);
            var role = roleRepository.findByName(Roles.Supplier);
            var ur = UserRoleEntity
                    .builder()
                    .role(role)
                    .user(user)
                    .build();
            userRoleRepository.save(ur);
        }
    }

    private void seedWarestores() {
        if(wareStoreRepository.count() == 0) {
            var warestore1 = WareStoreEntity
                    .builder()
                    .name("transistors")
                    .build();
            var warestore2 = WareStoreEntity
                    .builder()
                    .name("resistors")
                    .build();
            var warestore3 = WareStoreEntity
                    .builder()
                    .name("microchips")
                    .build();
            var warestore4 = WareStoreEntity
                    .builder()
                    .name("controllers")
                    .build();
            wareStoreRepository.save(warestore1);
            wareStoreRepository.save(warestore2);
            wareStoreRepository.save(warestore3);
            wareStoreRepository.save(warestore4);
        }
    }

    private void seedComponents() {
        if (componentRepository.count() == 0) {
            var transistorsWareStore = wareStoreRepository.findByName("transistors")
                    .orElseThrow(() -> new RuntimeException("Transistors warehouse not found"));
            var resistorsWareStore = wareStoreRepository.findByName("resistors")
                    .orElseThrow(() -> new RuntimeException("Resistors warehouse not found"));
            var microchipsWareStore = wareStoreRepository.findByName("microchips")
                    .orElseThrow(() -> new RuntimeException("Microchips warehouse not found"));
            var controllersWareStore = wareStoreRepository.findByName("controllers")
                    .orElseThrow(() -> new RuntimeException("Controllers warehouse not found"));

            // Транзистори
            createAndSaveComponent("Радіомодуль SI4432(240-960МГц, до 1 км)", "Радіомодуль для передачі даних", "transistor", "in stock", "https://beegreen.com.ua/image/cache/catalog/TOVARY/10501_10750/10612/10612-51-400x225.jpg", 1, transistorsWareStore);
            createAndSaveComponent("Радіомодуль nRf24L01", "Радіомодуль для бездротового зв'язку", "transistor","in stock", "https://distancionka.com/upload/cssinliner_webp/iblock/afc/ccsh6p6q2ptd3kr1drtpz5aowsx45ugj.webp", 1, transistorsWareStore);

            // Резистори
            createAndSaveComponent("Комплект перемичок для безконтактного монтажу", "Комплект для електронних проектів", "resistor","in stock", "https://arduino.ua/products_pictures/medium_AOC430-1.jpg", 1, resistorsWareStore);
            createAndSaveComponent("Набір контактних перемичок", "Набір для монтажу", "resistor","in stock", "https://images.prom.ua/5630810725_w200_h200_peremychki-dlya-maketnyh.jpg", 1, resistorsWareStore);

            // Мікрочіпи
            createAndSaveComponent("Модуль EEPROM 256kB AT24C256 I2C", "Модуль пам'яті", "microchip","in Stock", "https://www.mini-tech.com.ua/image/cache/catalog/raznoe/at24c256-eeprom-1-228x228.jpg", 1, microchipsWareStore);
            createAndSaveComponent("Модуль RFID", "Модуль для RFID-систем", "microchip","in stock", "https://arduino.ua/products_pictures/medium_RC522_RFID_Module-3.jpg", 1, microchipsWareStore);
            createAndSaveComponent("Модуль GSM GPRS SIM900A", "Модуль для GSM/GPRS зв'язку", "microchip", "in stock", "https://electrochip.mk.ua/wp-content/uploads/2024/04/10178375771464766201.jpg", 1, microchipsWareStore);
            createAndSaveComponent("Модуль WI-FI ESP8266 ESP-12", "Модуль для WI-FI зв'язку", "microchip","in stock", "https://arduino.ua/products_pictures/medium_aoc353_1.jpg", 1, microchipsWareStore);
            createAndSaveComponent("Модуль WIFI-UART ESP8266", "Модуль для WI-FI UART зв'язку", "microchip", "in stock", "https://www.mini-tech.com.ua/image/cache/catalog/communication/esp-01_black_1-228x228.jpg", 1, microchipsWareStore);
            createAndSaveComponent("Плата STM32 STM32F103C8T6", "Мікроконтролерна плата", "microchip","in stock", "https://www.mini-tech.com.ua/image/cache/catalog/STM32%20boards/STM32F103C8T6-228x228.JPG", 1, microchipsWareStore);

            // Контролери
            createAndSaveComponent("SD card reader для Arduino", "Читач SD-карт для Arduino", "controller", "in stock", "https://arduino.ua/products_pictures/medium_SDcardModule.jpg", 1, controllersWareStore);
            createAndSaveComponent("Інфрачервоний пульт з приймачем", "Пульт для Arduino", "controller", "in stock", "https://beegreen.com.ua/image/cache/catalog/TOVARY/12001_12250/12050/12050-1-400x225.JPG", 1, controllersWareStore);
            createAndSaveComponent("Акселерометр і гіроскоп MPU-6050", "Сенсор для вимірювання руху", "controller", "in stock", "https://www.mini-tech.com.ua/image/cache/catalog/gy-521_guro_accel_1-228x228.jpg", 1, controllersWareStore);
            createAndSaveComponent("Джостик аналоговий", "Аналоговий джостик", "controller","in stock", "https://3v3.com.ua/data/medium/joy.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата (корпус): Black BOX For Orange Pi", "Корпус для Orange Pi", "controller","in stock", "https://images.prom.ua/6385744453_w640_h640_black-box-for.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: ETHERNET ENC28J60", "Ethernet модуль", "controller", "in stock", "https://arduino.ua/products_pictures/medium_aoc105_1.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: датчик температури DS18B20 герметичний", "Датчик температури", "controller", "in stock", "https://images.prom.ua/4005986260_datchik-temperaturi-ds18b20.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: матрична клавіатура 4x4", "Клавіатура 4x4", "controller", "in stock", "https://images.prom.ua/1169936490_w640_h640_matrichna-klaviatura-4x4.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: цифровий енкодер PЕС11R-4220F-N0024", "Цифровий енкодер", "controller", "in stock", "https://images.prom.ua/5369419041_w640_h640_pec11r-4220f-n0024-enkoder-inkrementnyj.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: Orange Pi 2G-IOT", "Плата Orange Pi", "controller", "in stock", "https://miniboard.com.ua/3405-large_default2x/orange-pi-2g-iot.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: датчик дощу, погодний модуль для Arduino", "Датчик дощу", "controller", "in stock", "https://radiostore.ua/image/product/big/4-7-7-1-55558640640.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата ARDUINO MEGA 2560", "Arduino Mega 2560", "controller", "in stock", "https://images.prom.ua/2459165695_arduino-mega-2560.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата LCD дисплей 16*2", "LCD дисплей", "controller", "in stock", "https://www.mini-tech.com.ua/image/cache/catalog/1602A_yellow_1-228x228.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: Real Time Clock модуль DS1302", "RTC модуль", "controller","in stock", "https://images.prom.ua/3590830063_modul-godinnika-realnogo.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: 4-х канальний модуль реле 5В-10А", "Модуль реле", "controller","in stock", "https://arduino.ua/products_pictures/medium_large_4xrelayModule.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: 4-х канальний перетворювач логічних рівнів", "Перетворювач логічних рівнів", "controller", "in stock", "https://arduino.ua/products_pictures/medium_AOC537-1.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: RS-485 трансівер MAX485", "RS-485 трансівер", "controller","in stock", "https://images.prom.ua/158987620_w640_h640_rs-485-transiver-max485.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: TFT дисплей 1,44", "TFT дисплей", "controller","In Stock", "https://arduino.ua/products_pictures/medium_aoc873_2.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: аналоговий датчик газу (алкоголь, бензин)", "Датчик газу", "controller","in stock", "http://www.kosmodrom.com.ua/pic/MQ-2SensorModul.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: гігрометр, датчик вологи грунту", "Датчик вологи грунту", "controller","in stock", "https://beegreen.com.ua/image/cache/catalog/TOVARY/10751_11000/10943/10943-1-400x225.JPG", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: давач відстані GP2Y0A02YK0F", "Датчик відстані", "controller","in stock", "https://images.prom.ua/2269432412_w640_h640_infrachervonij-datchik-vidstani.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: датчик вогню, полум'я", "Датчик вогню", "controller","in stock", "https://images.prom.ua/142890227_w640_h640_datchik-vognyu-polumya.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: мініатюрний модуль Gy-68 на основі ВМР180", "Модуль BMP180", "controller", "in stock", "https://www.mini-tech.com.ua/image/cache/catalog/sensors/GY-68_1-228x228.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: модуль датчик руху PIR (HC-SR501)", "PIR датчик руху", "controller","in stock", "https://www.mini-tech.com.ua/image/cache/catalog/sensors/hc-sr501_1-228x228.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: модуль датчик температури і вологості DHT22", "DHT22 датчик", "controller", "in stock", "https://imrad.com.ua/userdata/modules/wproducts/product/main/x210561.jpg.pagespeed.ic.CYIjMxUAXl.webp", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: модуль датчик тиску і температури BMP280", "BMP280 датчик", "controller","in stock", "https://images.prom.ua/1089563149_w640_h640_bmp280-datchik-atmosfernogo.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: модуль датчиків обходу перешкод", "Датчик обходу перешкод", "controller", "in stock", "https://images.prom.ua/139876568_w640_h640_modul-datchikiv-obhodu.jpg", 1, controllersWareStore);
            createAndSaveComponent("Електронна плата: модуль датчика Холла 3144E", "Датчик Холла", "controller","in stock", "https://images.prom.ua/1280899527_w640_h640_1280899527.jpg", 1, controllersWareStore);
            createAndSaveComponent("Комплект для макетування Arduino Raspberry Pi", "Комплект для макетування", "controller","in stock", "https://images.prom.ua/6011188595_w640_h640_komplekt-dlya-maketuvannya.jpg", 1, controllersWareStore);
            createAndSaveComponent("Кроковий двигун з драйвером ULN2003", "Кроковий двигун", "controller", "in stock", "https://www.mini-tech.com.ua/image/cache/catalog/5v-stepper-motor-with-uln2003-driver-228x228.jpg", 1, controllersWareStore);
            createAndSaveComponent("Сервопривід 1,5 кг/см", "Сервопривід", "controller", "in stock", "https://images.prom.ua/131640214_w640_h640_servoprivid-15kgsm-9g.jpg", 1, controllersWareStore);
            createAndSaveComponent("Сервопривід S3003 4кг/см", "Сервопривід", "controller", "in stock", "https://images.prom.ua/131635321_w640_h640_131635321.jpg", 1, controllersWareStore);
            createAndSaveComponent("Тестер для сервоприводів, сервотестер", "Сервотестер", "controller","in stock", "https://modelistam.com.ua/images/servotester-ccpm-1.jpg", 1, controllersWareStore);
            createAndSaveComponent("Ультразвуковий датчик відстані HC-SR04", "Ультразвуковий датчик", "controller", "in stock", "https://arduino.ua/products_pictures/medium_Yltrazvykovoi_datchik_rasstoyaniya-1.jpg", 1, controllersWareStore);
        }
    }

    private void createAndSaveComponent(String name, String description, String category, String stockStatus, String imageUrl, int quantity, WareStoreEntity wareStore) {
        var component = ComponentEntity
                .builder()
                .name(name)
                .description(description)
                .category(category)
                .stockStatus(stockStatus)
                .imageUrl(imageUrl)
                .quantity(quantity)
                .wareStore(wareStore)
                .build();
        componentRepository.save(component);
    }
}
