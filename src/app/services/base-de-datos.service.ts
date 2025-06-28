import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BaseDeDatosService {
  private dbInstance!: SQLiteObject;
  private isDbReady: Promise<boolean>;
  private isWeb = false;

  constructor(
    private sqlite: SQLite,
    private platform: Platform
  ) {
    // Verificar si estamos en la web
    this.isWeb = !this.platform.is('cordova');
    this.isDbReady = this.initializeDatabase();
  }

  private async initializeDatabase(): Promise<boolean> {
    try {
      if (this.isWeb) {
        console.warn('SQLite no está disponible en la web. Usando localStorage como respaldo.');
        return true;
      }

      console.log('Inicializando base de datos SQLite...');
      this.dbInstance = await this.sqlite.create({
        name: 'mydatabase.db',
        location: 'default'
      });

      console.log('Base de datos creada, creando tablas...');
      await this.createTables();
      console.log('Tablas creadas correctamente');
      return true;

    } catch (error) {
      console.error('Error al iniciar la base de datos:', error);
      throw error;
    }
  }

  private async createTables() {
    try {
      const sql = `
        CREATE TABLE IF NOT EXISTS users(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          apellido TEXT,
          usuario TEXT UNIQUE,
          password TEXT,
          nivel_educacion TEXT,
          fecha_nacimiento TEXT
        )`;
      
      if (this.isWeb) {
        // Simular creación de tabla en web
        if (!localStorage.getItem('users')) {
          localStorage.setItem('users', JSON.stringify([]));
        }
        return;
      }

      await this.dbInstance.executeSql(sql, []);
    } catch (error) {
      console.error('Error al crear tablas:', error);
      throw error;
    }
  }

  async registerUser(nombre: string, apellido: string, usuario: string, password: string, nivelEducacion: string, fechaNacimiento: string): Promise<boolean> {
    try {
      await this.isDbReady;

      if (this.isWeb) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({ nombre, apellido, usuario, password, nivel_educacion: nivelEducacion, fecha_nacimiento: fechaNacimiento });
        localStorage.setItem('users', JSON.stringify(users));
        return true;
      }

      await this.dbInstance.executeSql(
        `INSERT INTO users (nombre, apellido, usuario, password, nivel_educacion, fecha_nacimiento)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [nombre, apellido, usuario, password, nivelEducacion, fechaNacimiento]
      );
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  async loginUser(usuario: string, password: string): Promise<boolean> {
    try {
      await this.isDbReady;

      if (this.isWeb) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.usuario === usuario && u.password === password);
        return !!user;
      }

      const result = await this.dbInstance.executeSql(
        'SELECT * FROM users WHERE usuario = ? AND password = ?',
        [usuario, password]
      );
      return result.rows.length > 0;
    } catch (error) {
      console.error('Error en loginUser:', error);
      throw error;
    }
  }
}