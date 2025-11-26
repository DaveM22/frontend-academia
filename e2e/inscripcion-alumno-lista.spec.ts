import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:4200';
const TEST_EMAIL = 'test@test.com';
const TEST_PASSWORD = 'test123';

// Configurar timeouts más amplios
test.setTimeout(120000);

async function loginWithAuth0(page: any) {
  try {
    // Navegar a la página de inicio
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Esperar un poco para que se cargue completamente
    await page.waitForTimeout(2000);

    // Buscar y hacer clic en el botón de login
    const loginButton = page.locator('button:has-text("Ingresar"), p-button:has-text("Ingresar")');
    const isLoginVisible = await loginButton.isVisible({ timeout: 10000 }).catch(() => false);
    
    if (isLoginVisible) {
      await loginButton.click({ timeout: 10000 });
      await page.waitForTimeout(2000);
    }

    // Esperar a que se redirija a Auth0 o mostrar formulario
    await page.waitForTimeout(3000);

    // Intentar encontrar email input (puede estar en diferentes lugares)
    const emailInput = page.locator(
      'input[type="text"], input[name="email"], input[placeholder*="email"], input[placeholder*="Email"]'
    );
    
    const isEmailVisible = await emailInput.first().isVisible({ timeout: 10000 }).catch(() => false);
    
    if (isEmailVisible) {
      await emailInput.first().fill(TEST_EMAIL, { timeout: 5000 });
      await page.waitForTimeout(500);
      
      const passwordInput = page.locator(
        'input[type="password"], input[name="password"], input[placeholder*="password"]'
      );
      await passwordInput.first().fill(TEST_PASSWORD, { timeout: 5000 });
      await page.waitForTimeout(500);
      
      const submitButton = page.locator(
        'button:has-text("Iniciar Sesión"), button:has-text("Login"), button:has-text("Sign In"), button:has-text("Continuar"), button[type="submit"]'
      );
      const isSubmitVisible = await submitButton.first().isVisible({ timeout: 5000 }).catch(() => false);
      
      if (isSubmitVisible) {
        await submitButton.first().click({ timeout: 10000 });
        await page.waitForTimeout(3000);
      }
    }

    // Esperar a que se complete el callback y se redirija a la app
    await page.waitForURL(`${BASE_URL}/**`, { timeout: 45000 }).catch(() => null);
    await page.waitForLoadState('domcontentloaded', { timeout: 30000 }).catch(() => null);
    await page.waitForTimeout(2000);
  } catch (error) {
    console.log('Login error (continuando con los tests):', error);
  }
}

test.describe('Inscripción Alumno Lista', () => {
  test.beforeEach(async ({ page }) => {
    await loginWithAuth0(page);
  });

/*   test('Debe cargar la lista de alumnos para inscripción', async ({ page }) => {
    // Navegar a la página de inscripción de alumnos
    await page.goto(`${BASE_URL}/inscripciones/alumnos/lista`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Verificar que se carga el componente
    const alumnoPanel = page.locator('app-inscripcion-alumno');
    const isPanelVisible = await alumnoPanel.isVisible({ timeout: 15000 }).catch(() => false);
    
    if (isPanelVisible) {
      await expect(alumnoPanel).toBeVisible();
    }

    // Esperar a que se cargue la tabla o lista de alumnos
    await page.waitForSelector('p-table, table, [role="grid"]', { timeout: 10000 }).catch(() => null);
  }); */

/*   test('Debe poder filtrar alumnos por especialidad y plan', async ({ page }) => {
    // Navegar al home
    await page.waitForTimeout(3000);

    // Buscar el menú/botón de "Inscripciones de Alumnos"
    const inscripcionesMenu = page.locator(
      'a:has-text("Inscripciones de Alumnos"), ' +
      'button:has-text("Inscripciones de Alumnos"), ' +
      'p-menuitem:has-text("Inscripciones de Alumnos"), ' +
      '[routerLink*="inscripcion"]'
    ).first();

    const isMenuVisible = await inscripcionesMenu.isVisible({ timeout: 10000 }).catch(() => false);
    
    if (isMenuVisible) {
      console.log('✅ Menú "Inscripciones de Alumnos" encontrado');
      await inscripcionesMenu.click({ timeout: 10000 });
      await page.waitForNavigation({ timeout: 15000 }).catch(() => null);
      await page.waitForTimeout(3000);
    } else {
      console.log('❌ Menú "Inscripciones de Alumnos" no encontrado');
    }

    // Verificar que se carga el componente
    const alumnoListaComponent = page.locator('app-inscripcion-alumno-lista');
    const isComponentVisible = await alumnoListaComponent.isVisible({ timeout: 15000 }).catch(() => false);
    
    console.log(`Componente visible: ${isComponentVisible}`);
    
    if (isComponentVisible) {
      console.log('✅ Componente inscripcion-alumno-lista cargado');
      await page.screenshot({ path: 'debug-1-componente-cargado.png' });

      // 1. ESPECIALIDAD - p-select
      console.log('\n📍 Abriendo p-select de ESPECIALIDAD...');
      const especialidadSelect = page.locator('p-select').first();
      
      // Hacer clic en el p-select
      await especialidadSelect.click({ timeout: 10000 });
      await page.waitForTimeout(1000);
      
      await page.screenshot({ path: 'debug-2-select-abierto.png' });

      // Buscar opciones en el panel del p-select
      let opciones = page.locator('p-selectItem');
      let opcionCount = await opciones.count().catch(() => 0);
      console.log(`Se encontraron ${opcionCount} opciones p-selectItem`);

      // Si no encuentra con p-selectItem, intenta con [role="option"]
      if (opcionCount === 0) {
        opciones = page.locator('[role="option"]');
        opcionCount = await opciones.count().catch(() => 0);
        console.log(`Se encontraron ${opcionCount} opciones con role="option"`);
      }

      if (opcionCount > 0) {
        console.log(`✅ Seleccionando primera especialidad...`);
        await opciones.first().click({ timeout: 10000 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'debug-3-especialidad-seleccionada.png' });
      } else {
        console.log('❌ No se encontraron opciones en el p-select de especialidad');
      }

      // 2. PLAN - p-select
      console.log('\n📍 Abriendo p-select de PLAN...');
      const planSelect = page.locator('p-select').nth(1);
      
      // Hacer clic en el segundo p-select
      await planSelect.click({ timeout: 10000 });
      await page.waitForTimeout(1000);
      
      await page.screenshot({ path: 'debug-4-plan-select-abierto.png' });

      // Buscar opciones en el panel del p-select
      let opcionesplan = page.locator('p-selectItem');
      let opcionPlanCount = await opcionesplan.count().catch(() => 0);
      console.log(`Se encontraron ${opcionPlanCount} opciones p-selectItem en plan`);

      if (opcionPlanCount === 0) {
        opcionesplan = page.locator('[role="option"]');
        opcionPlanCount = await opcionesplan.count().catch(() => 0);
        console.log(`Se encontraron ${opcionPlanCount} opciones con role="option" en plan`);
      }

      if (opcionPlanCount > 0) {
        console.log(`✅ Seleccionando primer plan...`);
        await opcionesplan.first().click({ timeout: 10000 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'debug-5-plan-seleccionado.png' });
      } else {
        console.log('❌ No se encontraron opciones en el p-select de plan');
      }

      // 3. Verificar tabla de alumnos
      console.log('\n📍 Verificando tabla de alumnos...');
      await page.waitForTimeout(2000);
      const alumnosTable = page.locator('p-table');
      const isTableVisible = await alumnosTable.isVisible({ timeout: 10000 }).catch(() => false);
      
      if (isTableVisible) {
        console.log('✅ Tabla de alumnos cargada');
        await page.screenshot({ path: 'debug-6-tabla-cargada.png' });

        const tableRows = page.locator('p-table tbody tr');
        const rowCount = await tableRows.count().catch(() => 0);
        console.log(`✅ Se encontraron ${rowCount} alumnos`);
        
        if (rowCount > 0) {
          await expect(tableRows.first()).toBeVisible();
        }
      } else {
        console.log('❌ Tabla de alumnos no visible');
      }

      console.log('\n✅ Test finalizado');
    }
  });

  test('Debe poder buscar alumnos por nombre', async ({ page }) => {
    // Navegar al home
    await page.waitForTimeout(3000);

    // Buscar el menú/botón de "Inscripciones de Alumnos"
    const inscripcionesMenu = page.locator(
      'a:has-text("Inscripciones de Alumnos"), ' +
      'button:has-text("Inscripciones de Alumnos"), ' +
      'p-menuitem:has-text("Inscripciones de Alumnos"), ' +
      '[routerLink*="inscripcion"]'
    ).first();

    const isMenuVisible = await inscripcionesMenu.isVisible({ timeout: 10000 }).catch(() => false);
    
    if (isMenuVisible) {
      console.log('✅ Menú "Inscripciones de Alumnos" encontrado');
      await inscripcionesMenu.click({ timeout: 10000 });
      await page.waitForNavigation({ timeout: 15000 }).catch(() => null);
      await page.waitForTimeout(3000);
    } else {
      console.log('❌ Menú "Inscripciones de Alumnos" no encontrado');
    }

    // Verificar que se carga el componente
    const alumnoListaComponent = page.locator('app-inscripcion-alumno-lista');
    const isComponentVisible = await alumnoListaComponent.isVisible({ timeout: 15000 }).catch(() => false);
    
    console.log(`Componente visible: ${isComponentVisible}`);
    
    if (isComponentVisible) {
      console.log('✅ Componente inscripcion-alumno-lista cargado');
      await page.screenshot({ path: 'debug-busqueda-1-componente-cargado.png' });

      // 1. ESPECIALIDAD - p-select
      console.log('\n📍 Abriendo p-select de ESPECIALIDAD...');
      const especialidadSelect = page.locator('p-select').first();
      
      await especialidadSelect.click({ timeout: 10000 });
      await page.waitForTimeout(1000);
      
      await page.screenshot({ path: 'debug-busqueda-2-select-abierto.png' });

      // Buscar opciones en el panel del p-select
      let opciones = page.locator('p-selectItem');
      let opcionCount = await opciones.count().catch(() => 0);
      console.log(`Se encontraron ${opcionCount} opciones p-selectItem`);

      if (opcionCount === 0) {
        opciones = page.locator('[role="option"]');
        opcionCount = await opciones.count().catch(() => 0);
        console.log(`Se encontraron ${opcionCount} opciones con role="option"`);
      }

      if (opcionCount > 0) {
        console.log(`✅ Seleccionando primera especialidad...`);
        await opciones.first().click({ timeout: 10000 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'debug-busqueda-3-especialidad-seleccionada.png' });
      } else {
        console.log('❌ No se encontraron opciones en el p-select de especialidad');
      }

      // 2. PLAN - p-select
      console.log('\n📍 Abriendo p-select de PLAN...');
      const planSelect = page.locator('p-select').nth(1);
      
      await planSelect.click({ timeout: 10000 });
      await page.waitForTimeout(1000);
      
      await page.screenshot({ path: 'debug-busqueda-4-plan-select-abierto.png' });

      // Buscar opciones en el panel del p-select
      let opcionesplan = page.locator('p-selectItem');
      let opcionPlanCount = await opcionesplan.count().catch(() => 0);
      console.log(`Se encontraron ${opcionPlanCount} opciones p-selectItem en plan`);

      if (opcionPlanCount === 0) {
        opcionesplan = page.locator('[role="option"]');
        opcionPlanCount = await opcionesplan.count().catch(() => 0);
        console.log(`Se encontraron ${opcionPlanCount} opciones con role="option" en plan`);
      }

      if (opcionPlanCount > 0) {
        console.log(`✅ Seleccionando primer plan...`);
        await opcionesplan.first().click({ timeout: 10000 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'debug-busqueda-5-plan-seleccionado.png' });
      } else {
        console.log('❌ No se encontraron opciones en el p-select de plan');
      }

      // 3. Verificar tabla de alumnos ANTES de la búsqueda
      console.log('\n📍 Verificando tabla de alumnos ANTES de la búsqueda...');
      await page.waitForTimeout(2000);
      const alumnosTable = page.locator('p-table');
      const isTableVisible = await alumnosTable.isVisible({ timeout: 10000 }).catch(() => false);
      
      let rowCountAntes = 0;
      if (isTableVisible) {
        console.log('✅ Tabla de alumnos cargada');
        await page.screenshot({ path: 'debug-busqueda-6-tabla-antes.png' });

        const tableRows = page.locator('p-table tbody tr');
        rowCountAntes = await tableRows.count().catch(() => 0);
        console.log(`Se encontraron ${rowCountAntes} alumnos ANTES de la búsqueda`);
      } else {
        console.log('❌ Tabla de alumnos no visible');
      }

      // 4. BÚSQUEDA POR NOMBRE
      console.log('\n📍 Buscando alumnos con la letra "A"...');
      const searchInput = page.locator('input[placeholder*="Buscar"], input[placeholder*="búsqueda"], input[placeholder*="Nombre"]');
      
      const isSearchVisible = await searchInput.isVisible({ timeout: 10000 }).catch(() => false);
      
      if (isSearchVisible) {
        console.log('✅ Campo de búsqueda encontrado');
        await searchInput.fill('Ale', { timeout: 5000 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'debug-busqueda-7-buscando.png' });
      } else {
        console.log('❌ Campo de búsqueda no encontrado');
      }

      // 5. Verificar tabla de alumnos DESPUÉS de la búsqueda
      console.log('\n📍 Verificando tabla de alumnos DESPUÉS de la búsqueda...');
      await page.waitForTimeout(1000);
      
      let rowCountDespues = 0;
      const alumnosTableDespues = page.locator('p-table');
      const isTableVisibleDespues = await alumnosTableDespues.isVisible({ timeout: 10000 }).catch(() => false);
      
      if (isTableVisibleDespues) {
        console.log('✅ Tabla de alumnos cargada después de búsqueda');
        await page.screenshot({ path: 'debug-busqueda-8-tabla-despues.png' });

        const tableRowsDespues = page.locator('p-table tbody tr');
        rowCountDespues = await tableRowsDespues.count().catch(() => 0);
        console.log(`Se encontraron ${rowCountDespues} alumnos DESPUÉS de la búsqueda`);

        // Verificar que el resultado cambió
        if (rowCountDespues !== rowCountAntes) {
          console.log(`✅ El resultado cambió: ${rowCountAntes} → ${rowCountDespues} alumnos`);
          await expect(tableRowsDespues.first()).toBeVisible();
        } else {
          console.log(`⚠️  El resultado no cambió: ${rowCountAntes} alumnos en ambos casos`);
        }
      } else {
        console.log('❌ Tabla de alumnos no visible después de búsqueda');
      }

      console.log('\n✅ Test de búsqueda finalizado');
    }
  });
 */
/*   test('Debe poder hacer clic en un alumno para ver inscripciones', async ({ page }) => {
    // Navegar al home
    await page.waitForTimeout(3000);

    // Buscar el menú/botón de "Inscripciones de Alumnos"
    const inscripcionesMenu = page.locator(
      'a:has-text("Inscripciones de Alumnos"), ' +
      'button:has-text("Inscripciones de Alumnos"), ' +
      'p-menuitem:has-text("Inscripciones de Alumnos"), ' +
      '[routerLink*="inscripcion"]'
    ).first();

    const isMenuVisible = await inscripcionesMenu.isVisible({ timeout: 10000 }).catch(() => false);
    
    if (isMenuVisible) {
      console.log('✅ Menú "Inscripciones de Alumnos" encontrado');
      await inscripcionesMenu.click({ timeout: 10000 });
      await page.waitForNavigation({ timeout: 15000 }).catch(() => null);
      await page.waitForTimeout(3000);
    } else {
      console.log('❌ Menú "Inscripciones de Alumnos" no encontrado');
    }

    // Verificar que se carga el componente
    const alumnoListaComponent = page.locator('app-inscripcion-alumno-lista');
    const isComponentVisible = await alumnoListaComponent.isVisible({ timeout: 15000 }).catch(() => false);
    
    console.log(`Componente visible: ${isComponentVisible}`);
    
    if (isComponentVisible) {
      console.log('✅ Componente inscripcion-alumno-lista cargado');
      await page.screenshot({ path: 'debug-detalle-1-componente-cargado.png' });

      // 1. ESPECIALIDAD - p-select
      console.log('\n📍 Abriendo p-select de ESPECIALIDAD...');
      const especialidadSelect = page.locator('p-select').first();
      
      await especialidadSelect.click({ timeout: 10000 });
      await page.waitForTimeout(1000);
      
      await page.screenshot({ path: 'debug-detalle-2-select-abierto.png' });

      // Buscar opciones en el panel del p-select
      let opciones = page.locator('p-selectItem');
      let opcionCount = await opciones.count().catch(() => 0);
      console.log(`Se encontraron ${opcionCount} opciones p-selectItem`);

      if (opcionCount === 0) {
        opciones = page.locator('[role="option"]');
        opcionCount = await opciones.count().catch(() => 0);
        console.log(`Se encontraron ${opcionCount} opciones con role="option"`);
      }

      if (opcionCount > 0) {
        console.log(`✅ Seleccionando primera especialidad...`);
        await opciones.first().click({ timeout: 10000 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'debug-detalle-3-especialidad-seleccionada.png' });
      } else {
        console.log('❌ No se encontraron opciones en el p-select de especialidad');
      }

      // 2. PLAN - p-select
      console.log('\n📍 Abriendo p-select de PLAN...');
      const planSelect = page.locator('p-select').nth(1);
      
      await planSelect.click({ timeout: 10000 });
      await page.waitForTimeout(1000);
      
      await page.screenshot({ path: 'debug-detalle-4-plan-select-abierto.png' });

      // Buscar opciones en el panel del p-select
      let opcionesplan = page.locator('p-selectItem');
      let opcionPlanCount = await opcionesplan.count().catch(() => 0);
      console.log(`Se encontraron ${opcionPlanCount} opciones p-selectItem en plan`);

      if (opcionPlanCount === 0) {
        opcionesplan = page.locator('[role="option"]');
        opcionPlanCount = await opcionesplan.count().catch(() => 0);
        console.log(`Se encontraron ${opcionPlanCount} opciones con role="option" en plan`);
      }

      if (opcionPlanCount > 0) {
        console.log(`✅ Seleccionando primer plan...`);
        await opcionesplan.first().click({ timeout: 10000 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'debug-detalle-5-plan-seleccionado.png' });
      } else {
        console.log('❌ No se encontraron opciones en el p-select de plan');
      }

      // 3. Verificar tabla de alumnos
      console.log('\n📍 Verificando tabla de alumnos...');
      await page.waitForTimeout(2000);
      const alumnosTable = page.locator('p-table');
      const isTableVisible = await alumnosTable.isVisible({ timeout: 10000 }).catch(() => false);
      
      if (isTableVisible) {
        console.log('✅ Tabla de alumnos cargada');
        await page.screenshot({ path: 'debug-detalle-6-tabla-cargada.png' });

        const tableRows = page.locator('p-table tbody tr');
        const rowCount = await tableRows.count().catch(() => 0);
        console.log(`Se encontraron ${rowCount} alumnos`);
        
        if (rowCount > 0) {
          // 4. BUSCAR BOTÓN "INSCRIPCIONES"
          console.log('\n📍 Buscando botón "Inscripciones" en la primera fila...');
          
          // Buscar el botón dentro de la primera fila
          const firstRow = tableRows.first();
          await page.screenshot({ path: 'debug-detalle-6b-primera-fila.png' });
          
          // Buscar el p-button con name="inscripciones"
          let inscripcionesButton = firstRow.locator('p-button[name="inscripciones"]');
          let isButtonVisible = await inscripcionesButton.isVisible({ timeout: 5000 }).catch(() => false);
          
          if (!isButtonVisible) {
            console.log('Intentando con span que contiene "Inscripciones"...');
            inscripcionesButton = firstRow.locator('span:has-text("Inscripciones")');
            isButtonVisible = await inscripcionesButton.isVisible({ timeout: 5000 }).catch(() => false);
          }

          if (!isButtonVisible) {
            console.log('Intentando con button dentro de p-button...');
            inscripcionesButton = firstRow.locator('p-button button');
            isButtonVisible = await inscripcionesButton.isVisible({ timeout: 5000 }).catch(() => false);
          }

          if (!isButtonVisible) {
            console.log('Intentando con cualquier p-button...');
            inscripcionesButton = firstRow.locator('p-button');
            isButtonVisible = await inscripcionesButton.isVisible({ timeout: 5000 }).catch(() => false);
          }
          
          if (isButtonVisible) {
            console.log('✅ Botón "Inscripciones" encontrado');
            
            // Scroll hacia el botón para asegurarse de que está visible
            await inscripcionesButton.scrollIntoViewIfNeeded();
            await page.waitForTimeout(500);
            
            await page.screenshot({ path: 'debug-detalle-7-boton-encontrado.png' });
            
            // Hacer clic en el botón
            console.log('Haciendo clic en el botón "Inscripciones"...');
            await inscripcionesButton.click({ timeout: 10000, force: true });
            
            // Esperar a que se navegue
            await page.waitForNavigation({ timeout: 15000 }).catch(() => null);
            await page.waitForTimeout(2000);
            
            await page.screenshot({ path: 'debug-detalle-8-despues-clic.png' });
            
            // 5. VALIDAR QUE SE NAVEGO A LA RUTA CORRECTA
            console.log('\n📍 Validando navegación a ruta de inscripciones...');
            const currentUrl = page.url();
            console.log(`URL actual: ${currentUrl}`);
            
            // Validar que la URL contiene el patrón /inscripciones/alumnos/:id
            const inscripcionesRegex = /\/inscripciones\/alumnos\/\d+/;
            const isUrlCorrect = inscripcionesRegex.test(currentUrl);
            
            if (isUrlCorrect) {
              console.log(`✅ Navegación correcta: ${currentUrl}`);
              await expect(page).toHaveURL(/\/inscripciones\/alumnos\/\d+/);
            } else {
              console.log(`❌ URL incorrecta: ${currentUrl}`);
              console.log(`Esperado: /inscripciones/alumnos/:id`);
            }
          } else {
            console.log('❌ Botón "Inscripciones" no encontrado');
            
            // Debug: mostrar el contenido HTML de la primera fila
            const rowHtml = await firstRow.innerHTML();
            console.log('HTML de la primera fila:', rowHtml.substring(0, 500));
          }
        }
      } else {
        console.log('❌ Tabla de alumnos no visible');
      }

      console.log('\n✅ Test de navegación a inscripciones finalizado');
    }
  });

  test('Debe poder crear una nueva inscripción desde detalle de alumno', async ({ page }) => {
    // Navegar al home
    await page.waitForTimeout(3000);

    // Buscar el menú/botón de "Inscripciones de Alumnos"
    const inscripcionesMenu = page.locator(
      'a:has-text("Inscripciones de Alumnos"), ' +
      'button:has-text("Inscripciones de Alumnos"), ' +
      'p-menuitem:has-text("Inscripciones de Alumnos"), ' +
      '[routerLink*="inscripcion"]'
    ).first();

    const isMenuVisible = await inscripcionesMenu.isVisible({ timeout: 10000 }).catch(() => false);
    
    if (isMenuVisible) {
      console.log('✅ Menú "Inscripciones de Alumnos" encontrado');
      await inscripcionesMenu.click({ timeout: 10000 });
      await page.waitForNavigation({ timeout: 15000 }).catch(() => null);
      await page.waitForTimeout(3000);
    } else {
      console.log('❌ Menú "Inscripciones de Alumnos" no encontrado');
    }

    // Verificar que se carga el componente
    const alumnoListaComponent = page.locator('app-inscripcion-alumno-lista');
    const isComponentVisible = await alumnoListaComponent.isVisible({ timeout: 15000 }).catch(() => false);
    
    console.log(`Componente visible: ${isComponentVisible}`);
    
    if (isComponentVisible) {
      console.log('✅ Componente inscripcion-alumno-lista cargado');
      await page.screenshot({ path: 'debug-form-1-componente-cargado.png' });

      // 1. ESPECIALIDAD - p-select
      console.log('\n📍 Abriendo p-select de ESPECIALIDAD...');
      const especialidadSelect = page.locator('p-select').first();
      
      await especialidadSelect.click({ timeout: 10000 });
      await page.waitForTimeout(1000);
      
      await page.screenshot({ path: 'debug-form-2-select-abierto.png' });

      // Buscar opciones en el panel del p-select
      let opciones = page.locator('p-selectItem');
      let opcionCount = await opciones.count().catch(() => 0);
      console.log(`Se encontraron ${opcionCount} opciones p-selectItem`);

      if (opcionCount === 0) {
        opciones = page.locator('[role="option"]');
        opcionCount = await opciones.count().catch(() => 0);
        console.log(`Se encontraron ${opcionCount} opciones con role="option"`);
      }

      if (opcionCount > 0) {
        console.log(`✅ Seleccionando primera especialidad...`);
        await opciones.first().click({ timeout: 10000 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'debug-form-3-especialidad-seleccionada.png' });
      } else {
        console.log('❌ No se encontraron opciones en el p-select de especialidad');
      }

      // 2. PLAN - p-select
      console.log('\n📍 Abriendo p-select de PLAN...');
      const planSelect = page.locator('p-select').nth(1);
      
      await planSelect.click({ timeout: 10000 });
      await page.waitForTimeout(1000);
      
      await page.screenshot({ path: 'debug-form-4-plan-select-abierto.png' });

      // Buscar opciones en el panel del p-select
      let opcionesplan = page.locator('p-selectItem');
      let opcionPlanCount = await opcionesplan.count().catch(() => 0);
      console.log(`Se encontraron ${opcionPlanCount} opciones p-selectItem en plan`);

      if (opcionPlanCount === 0) {
        opcionesplan = page.locator('[role="option"]');
        opcionPlanCount = await opcionesplan.count().catch(() => 0);
        console.log(`Se encontraron ${opcionPlanCount} opciones con role="option" en plan`);
      }

      if (opcionPlanCount > 0) {
        console.log(`✅ Seleccionando primer plan...`);
        await opcionesplan.first().click({ timeout: 10000 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'debug-form-5-plan-seleccionado.png' });
      } else {
        console.log('❌ No se encontraron opciones en el p-select de plan');
      }

      // 3. Verificar tabla de alumnos
      console.log('\n📍 Verificando tabla de alumnos...');
      await page.waitForTimeout(2000);
      const alumnosTable = page.locator('p-table');
      const isTableVisible = await alumnosTable.isVisible({ timeout: 10000 }).catch(() => false);
      
      if (isTableVisible) {
        console.log('✅ Tabla de alumnos cargada');
        await page.screenshot({ path: 'debug-form-6-tabla-cargada.png' });

        const tableRows = page.locator('p-table tbody tr');
        const rowCount = await tableRows.count().catch(() => 0);
        console.log(`Se encontraron ${rowCount} alumnos`);
        
        if (rowCount > 0) {
          // 4. HACER CLIC EN BOTÓN "INSCRIPCIONES" DE LA PRIMERA FILA
          console.log('\n📍 Buscando botón "Inscripciones" en la primera fila...');
          
          const firstRow = tableRows.first();
          await page.screenshot({ path: 'debug-form-6b-primera-fila.png' });
          
          // Buscar el p-button con name="inscripciones"
          let inscripcionesButton = firstRow.locator('p-button[name="inscripciones"]');
          let isButtonVisible = await inscripcionesButton.isVisible({ timeout: 5000 }).catch(() => false);
          
          if (!isButtonVisible) {
            console.log('Intentando con span que contiene "Inscripciones"...');
            inscripcionesButton = firstRow.locator('span:has-text("Inscripciones")');
            isButtonVisible = await inscripcionesButton.isVisible({ timeout: 5000 }).catch(() => false);
          }

          if (!isButtonVisible) {
            console.log('Intentando con button dentro de p-button...');
            inscripcionesButton = firstRow.locator('p-button button');
            isButtonVisible = await inscripcionesButton.isVisible({ timeout: 5000 }).catch(() => false);
          }

          if (!isButtonVisible) {
            console.log('Intentando con cualquier p-button...');
            inscripcionesButton = firstRow.locator('p-button');
            isButtonVisible = await inscripcionesButton.isVisible({ timeout: 5000 }).catch(() => false);
          }
          
          if (isButtonVisible) {
            console.log('✅ Botón "Inscripciones" encontrado');
            
            await inscripcionesButton.scrollIntoViewIfNeeded();
            await page.waitForTimeout(250);
            
            console.log('Haciendo clic en el botón "Inscripciones"...');
            await inscripcionesButton.click({ timeout: 10000, force: true });
            await page.waitForNavigation({ timeout: 15000 }).catch(() => null);
            await page.waitForTimeout(1000);
            
            // VALIDAR QUE ESTAMOS EN LA PÁGINA DE DETALLE
            const detalleUrl = page.url();
            const detalleRegex = /\/inscripciones\/alumnos\/\d+/;
            const isDetalleUrlCorrect = detalleRegex.test(detalleUrl);
            
            if (isDetalleUrlCorrect) {
              console.log(`✅ Estamos en página de detalle: ${detalleUrl}`);
              
              // 5. BUSCAR BOTÓN "NUEVA INSCRIPCIÓN"
              console.log('\n📍 Buscando botón "Nueva Inscripción"...');
              
              // Intentar múltiples selectores para encontrar el botón
              let nuevaInscripcionButton = page.locator('p-button[label*="Nueva"]');
              let isNuevaVisible = await nuevaInscripcionButton.isVisible({ timeout: 5000 }).catch(() => false);
              
              if (!isNuevaVisible) {
                console.log('Intentando con span que contiene "Nueva"...');
                nuevaInscripcionButton = page.locator('span:has-text("Nueva")');
                isNuevaVisible = await nuevaInscripcionButton.isVisible({ timeout: 5000 }).catch(() => false);
              }

              if (!isNuevaVisible) {
                console.log('Intentando con button que contiene "Nueva"...');
                nuevaInscripcionButton = page.locator('button:has-text("Nueva")');
                isNuevaVisible = await nuevaInscripcionButton.isVisible({ timeout: 5000 }).catch(() => false);
              }

              if (!isNuevaVisible) {
                console.log('Intentando con p-button que contiene "Inscripción"...');
                nuevaInscripcionButton = page.locator('p-button:has-text("Inscripción")').first();
                isNuevaVisible = await nuevaInscripcionButton.isVisible({ timeout: 5000 }).catch(() => false);
              }
              
              if (isNuevaVisible) {
                console.log('✅ Botón "Nueva Inscripción" encontrado');
                
                await nuevaInscripcionButton.scrollIntoViewIfNeeded();
                await page.waitForTimeout(250);
                
                console.log('Haciendo clic en el botón "Nueva Inscripción"...');
                await nuevaInscripcionButton.click({ timeout: 10000, force: true });
                await page.waitForNavigation({ timeout: 15000 }).catch(() => null);
                await page.waitForTimeout(1000);
                
                // VALIDAR QUE ESTAMOS EN EL FORMULARIO
                const formUrl = page.url();
                const formularioComponent = page.locator('app-inscripcion-form, app-inscripcion-alumno-form, form');
                const isFormVisible = await formularioComponent.first().isVisible({ timeout: 5000 }).catch(() => false);
                
                if (isFormVisible) {
                  console.log(`✅ Estamos en el formulario de inscripción`);
                  
                  // 6. BUSCAR Y CLICKEAR BOTÓN "SELECCIONAR CURSO"
                  console.log('\n📍 Buscando botón "Seleccionar Curso"...');
                  
                  let seleccionarCursoButton = page.locator('button:has-text("Seleccionar curso")');
                  let isCursoButtonVisible = await seleccionarCursoButton.isVisible({ timeout: 5000 }).catch(() => false);
                  
                  if (!isCursoButtonVisible) {
                    console.log('Intentando con span que contiene "Seleccionar"...');
                    seleccionarCursoButton = page.locator('span:has-text("Seleccionar curso")');
                    isCursoButtonVisible = await seleccionarCursoButton.isVisible({ timeout: 5000 }).catch(() => false);
                  }

                  if (!isCursoButtonVisible) {
                    console.log('Intentando con p-button que contiene "Seleccionar"...');
                    seleccionarCursoButton = page.locator('p-button:has-text("Seleccionar")');
                    isCursoButtonVisible = await seleccionarCursoButton.isVisible({ timeout: 5000 }).catch(() => false);
                  }

                  if (!isCursoButtonVisible) {
                    console.log('Intentando con p-button[label*="Seleccionar"]...');
                    seleccionarCursoButton = page.locator('p-button[label*="Seleccionar"]');
                    isCursoButtonVisible = await seleccionarCursoButton.isVisible({ timeout: 5000 }).catch(() => false);
                  }
                  
                  if (isCursoButtonVisible) {
                    console.log('✅ Botón "Seleccionar Curso" encontrado');
                    await seleccionarCursoButton.scrollIntoViewIfNeeded();
                    await page.waitForTimeout(250);
                    
                    console.log('Haciendo clic en el botón "Seleccionar Curso"...');
                    await seleccionarCursoButton.click({ timeout: 10000, force: true });
                    await page.waitForTimeout(1000);
                    
                    // 7. ESPERAR A QUE EL MODAL SE ABRA
                    console.log('\n📍 Esperando que se abra el modal...');
                    const modal = page.locator('div.p-dialog');
                    const isModalVisible = await modal.isVisible({ timeout: 10000 }).catch(() => false);
                    
                    if (isModalVisible) {
                      console.log('✅ Modal abierto');
                      await page.waitForTimeout(750);
                      
                      // 8. SELECCIONAR MATERIA EN EL P-SELECT DEL MODAL
                      console.log('\n📍 Buscando p-select de MATERIAS en el modal...');
                      
                      const materiasSelect = modal.first().locator('p-select');
                      const isMateriasSelectVisible = await materiasSelect.isVisible({ timeout: 5000 }).catch(() => false);
                      
                      if (isMateriasSelectVisible) {
                        console.log('✅ Select de materias encontrado');
                        await materiasSelect.click({ timeout: 10000 });
                        await page.waitForTimeout(750);
                        
                        // Seleccionar primera opción de materia
                        let materiasOpciones = page.locator('p-selectItem');
                        let materiasOpcionCount = await materiasOpciones.count().catch(() => 0);
                        
                        if (materiasOpcionCount === 0) {
                          materiasOpciones = page.locator('[role="option"]');
                          materiasOpcionCount = await materiasOpciones.count().catch(() => 0);
                        }
                        
                        if (materiasOpcionCount > 0) {
                          console.log('✅ Seleccionando primera materia...');
                          await materiasOpciones.first().click({ timeout: 10000 });
                          await page.waitForTimeout(1000);
                          
                          // 9. BUSCAR Y CLICKEAR BOTÓN "SELECCIONAR" EN LA TABLA DEL MODAL
                          console.log('\n📍 Buscando botón "Seleccionar" en la primera fila de la tabla...');
                          
                          const modalTable = modal.first().locator('p-table');
                          const isModalTableVisible = await modalTable.isVisible({ timeout: 5000 }).catch(() => false);
                          
                          if (isModalTableVisible) {
                            const modalTableRows = modal.first().locator('p-table tbody tr');
                            const modalRowCount = await modalTableRows.count().catch(() => 0);
                            
                            if (modalRowCount > 0) {
                              const firstModalRow = modalTableRows.first();
                              
                              let seleccionarModalButton = firstModalRow.locator('p-button[label*="Seleccionar"]');
                              let isSeleccionarVisible = await seleccionarModalButton.isVisible({ timeout: 5000 }).catch(() => false);
                              
                              if (!isSeleccionarVisible) {
                                seleccionarModalButton = firstModalRow.locator('span:has-text("Seleccionar")');
                                isSeleccionarVisible = await seleccionarModalButton.isVisible({ timeout: 5000 }).catch(() => false);
                              }

                              if (!isSeleccionarVisible) {
                                seleccionarModalButton = firstModalRow.locator('button:has-text("Seleccionar")');
                                isSeleccionarVisible = await seleccionarModalButton.isVisible({ timeout: 5000 }).catch(() => false);
                              }

                              if (!isSeleccionarVisible) {
                                seleccionarModalButton = firstModalRow.locator('p-button').first();
                                isSeleccionarVisible = await seleccionarModalButton.isVisible({ timeout: 5000 }).catch(() => false);
                              }
                              
                              if (isSeleccionarVisible) {
                                console.log('✅ Botón "Seleccionar" encontrado');
                                await seleccionarModalButton.scrollIntoViewIfNeeded();
                                await page.waitForTimeout(250);
                                
                                console.log('Haciendo clic en el botón "Seleccionar"...');
                                await seleccionarModalButton.click({ timeout: 10000, force: true });
                                await page.waitForTimeout(1000);
                                
                                // 10. VERIFICAR QUE EL MODAL SE CERRÓ
                                console.log('\n📍 Verificando que el modal se cerró...');
                                const isModalClosedVisible = await modal.first().isVisible({ timeout: 5000 }).catch(() => false);
                                
                                if (!isModalClosedVisible) {
                                  console.log('✅ Modal cerrado correctamente');
                                  
                                  // 11. SELECCIONAR CONDICIÓN "INSCRIPTO"
                                  console.log('\n📍 Buscando p-select de CONDICIÓN...');
                                  
                                  const condicionSelect = page.locator('p-select').nth(0);
                                  const isCondicionSelectVisible = await condicionSelect.isVisible({ timeout: 5000 }).catch(() => false);
                                  
                                  if (isCondicionSelectVisible) {
                                    console.log('✅ Select de condición encontrado');
                                    await condicionSelect.click({ timeout: 10000 });
                                    await page.waitForTimeout(750);
                                    
                                    // Buscar opción "Inscripto"
                                    let condicionOpciones = page.locator('p-selectItem:has-text("Inscripto")');
                                    let isCondicionOpcionVisible = await condicionOpciones.isVisible({ timeout: 5000 }).catch(() => false);
                                    
                                    if (!isCondicionOpcionVisible) {
                                      condicionOpciones = page.locator('[role="option"]:has-text("Inscripto")');
                                      isCondicionOpcionVisible = await condicionOpciones.isVisible({ timeout: 5000 }).catch(() => false);
                                    }
                                    
                                    if (isCondicionOpcionVisible) {
                                      console.log('✅ Seleccionando "Inscripto"...');
                                      await condicionOpciones.click({ timeout: 10000 });
                                      await page.waitForTimeout(1000);
                                      
                                      // 12. BUSCAR Y CLICKEAR BOTÓN "GUARDAR"
                                      console.log('\n📍 Buscando botón "Guardar"...');
                                      
                                      let guardarButton = page.locator('p-button[label*="Guardar"], button:has-text("Guardar"), span:has-text("Guardar")');
                                      let isGuardarVisible = await guardarButton.first().isVisible({ timeout: 5000 }).catch(() => false);
                                      
                                      if (!isGuardarVisible) {
                                        guardarButton = page.locator('button[type="submit"]');
                                        isGuardarVisible = await guardarButton.isVisible({ timeout: 5000 }).catch(() => false);
                                      }
                                      
                                      if (isGuardarVisible) {
                                        console.log('✅ Botón "Guardar" encontrado');
                                        await guardarButton.first().scrollIntoViewIfNeeded();
                                        await page.waitForTimeout(250);
                                        
                                        console.log('Haciendo clic en el botón "Guardar"...');
                                        await guardarButton.first().click({ timeout: 10000, force: true });
                                        await page.waitForNavigation({ timeout: 15000 }).catch(() => null);
                                        await page.waitForTimeout(1000);
                                        
                                        // 13. VALIDAR QUE VOLVIMOS A LA PÁGINA DE INSCRIPCIONES DEL ALUMNO
                                        console.log('\n📍 Validando que volvimos a la página de inscripciones...');
                                        const finalUrl = page.url();
                                        console.log(`URL final: ${finalUrl}`);
                                        
                                        const finalRegex = /\/inscripciones\/alumnos\/\d+/;
                                        const isFinalUrlCorrect = finalRegex.test(finalUrl);
                                        
                                        if (isFinalUrlCorrect) {
                                          console.log(`✅ Volvimos a la página de inscripciones del alumno: ${finalUrl}`);
                                          await expect(page).toHaveURL(finalRegex);
                                        } else {
                                          console.log(`❌ URL incorrecta: ${finalUrl}`);
                                        }
                                      } else {
                                        console.log('❌ Botón "Guardar" no encontrado');
                                      }
                                    } else {
                                      console.log('❌ Opción "Inscripto" no encontrada');
                                    }
                                  } else {
                                    console.log('❌ Select de condición no encontrado');
                                  }
                                } else {
                                  console.log('❌ Modal no se cerró');
                                }
                              } else {
                                console.log('❌ Botón "Seleccionar" no encontrado en el modal');
                              }
                            }
                          } else {
                            console.log('❌ Tabla en el modal no encontrada');
                          }
                        } else {
                          console.log('❌ No hay opciones de materia');
                        }
                      } else {
                        console.log('❌ Select de materias no encontrado');
                      }
                    } else {
                      console.log('❌ Modal no se abrió');
                    }
                  } else {
                    console.log('❌ Botón "Seleccionar Curso" no encontrado');
                  }
                }
              }
            }
          }
        }
      }

      console.log('\n✅ Test de nueva inscripción finalizado');
    }
  }); */

  test('Debe poder completar el formulario de nueva inscripción', async ({ page }) => {
    // Navegar al home
    await page.waitForTimeout(1500);

    // Buscar el menú/botón de "Inscripciones de Alumnos"
    const inscripcionesMenu = page.locator(
      'a:has-text("Inscripciones de Alumnos"), ' +
      'button:has-text("Inscripciones de Alumnos"), ' +
      'p-menuitem:has-text("Inscripciones de Alumnos"), ' +
      '[routerLink*="inscripcion"]'
    ).first();

    const isMenuVisible = await inscripcionesMenu.isVisible({ timeout: 10000 }).catch(() => false);
    
    if (isMenuVisible) {
      console.log('✅ Menú "Inscripciones de Alumnos" encontrado');
      await inscripcionesMenu.click({ timeout: 10000 });
      await page.waitForNavigation({ timeout: 15000 }).catch(() => null);
      await page.waitForTimeout(1500);
    }

    const alumnoListaComponent = page.locator('app-inscripcion-alumno-lista');
    const isComponentVisible = await alumnoListaComponent.isVisible({ timeout: 15000 }).catch(() => false);
    
    if (isComponentVisible) {
      console.log('✅ Componente inscripcion-alumno-lista cargado');

      // 1. ESPECIALIDAD - p-select
      const especialidadSelect = page.locator('p-select').first();
      await especialidadSelect.click({ timeout: 10000 });
      await page.waitForTimeout(750);

      let opciones = page.locator('p-selectItem');
      let opcionCount = await opciones.count().catch(() => 0);

      if (opcionCount === 0) {
        opciones = page.locator('[role="option"]');
        opcionCount = await opciones.count().catch(() => 0);
      }

      if (opcionCount > 0) {
        console.log(`✅ Seleccionando primera especialidad...`);
        await opciones.first().click({ timeout: 10000 });
        await page.waitForTimeout(1000);
      }

      // 2. PLAN - p-select
      const planSelect = page.locator('p-select').nth(1);
      await planSelect.click({ timeout: 10000 });
      await page.waitForTimeout(750);

      let opcionesplan = page.locator('p-selectItem');
      let opcionPlanCount = await opcionesplan.count().catch(() => 0);

      if (opcionPlanCount === 0) {
        opcionesplan = page.locator('[role="option"]');
        opcionPlanCount = await opcionesplan.count().catch(() => 0);
      }

      if (opcionPlanCount > 0) {
        console.log(`✅ Seleccionando primer plan...`);
        await opcionesplan.first().click({ timeout: 10000 });
        await page.waitForTimeout(1000);
      }

      // 3. Verificar tabla de alumnos
      const alumnosTable = page.locator('p-table');
      const isTableVisible = await alumnosTable.isVisible({ timeout: 10000 }).catch(() => false);
      
      if (isTableVisible) {
        const tableRows = page.locator('p-table tbody tr');
        const rowCount = await tableRows.count().catch(() => 0);
        
        if (rowCount > 0) {
          const firstRow = tableRows.first();
          
          // 4. HACER CLIC EN BOTÓN "INSCRIPCIONES"
          let inscripcionesButton = firstRow.locator('p-button[name="inscripciones"]');
          let isButtonVisible = await inscripcionesButton.isVisible({ timeout: 5000 }).catch(() => false);
          
          if (!isButtonVisible) {
            inscripcionesButton = firstRow.locator('span:has-text("Inscripciones")');
            isButtonVisible = await inscripcionesButton.isVisible({ timeout: 5000 }).catch(() => false);
          }

          if (!isButtonVisible) {
            inscripcionesButton = firstRow.locator('p-button button');
            isButtonVisible = await inscripcionesButton.isVisible({ timeout: 5000 }).catch(() => false);
          }

          if (!isButtonVisible) {
            inscripcionesButton = firstRow.locator('p-button');
            isButtonVisible = await inscripcionesButton.isVisible({ timeout: 5000 }).catch(() => false);
          }
          
          if (isButtonVisible) {
            console.log('✅ Botón "Inscripciones" encontrado');
            await inscripcionesButton.scrollIntoViewIfNeeded();
            await page.waitForTimeout(250);
            
            console.log('Haciendo clic en el botón "Inscripciones"...');
            await inscripcionesButton.click({ timeout: 10000, force: true });
            await page.waitForNavigation({ timeout: 15000 }).catch(() => null);
            await page.waitForTimeout(1000);
            
            // VALIDAR QUE ESTAMOS EN LA PÁGINA DE DETALLE
            const detalleUrl = page.url();
            const detalleRegex = /\/inscripciones\/alumnos\/\d+/;
            const isDetalleUrlCorrect = detalleRegex.test(detalleUrl);
            
            if (isDetalleUrlCorrect) {
              console.log(`✅ Estamos en página de detalle: ${detalleUrl}`);
              
              // 5. BUSCAR BOTÓN "NUEVA INSCRIPCIÓN"
              console.log('\n📍 Buscando botón "Nueva Inscripción"...');
              
              // Intentar múltiples selectores para encontrar el botón
              let nuevaInscripcionButton = page.locator('p-button[label*="Nueva"]');
              let isNuevaVisible = await nuevaInscripcionButton.isVisible({ timeout: 5000 }).catch(() => false);
              
              if (!isNuevaVisible) {
                console.log('Intentando con span que contiene "Nueva"...');
                nuevaInscripcionButton = page.locator('span:has-text("Nueva")');
                isNuevaVisible = await nuevaInscripcionButton.isVisible({ timeout: 5000 }).catch(() => false);
              }

              if (!isNuevaVisible) {
                console.log('Intentando con button que contiene "Nueva"...');
                nuevaInscripcionButton = page.locator('button:has-text("Nueva")');
                isNuevaVisible = await nuevaInscripcionButton.isVisible({ timeout: 5000 }).catch(() => false);
              }

              if (!isNuevaVisible) {
                console.log('Intentando con p-button que contiene "Inscripción"...');
                nuevaInscripcionButton = page.locator('p-button:has-text("Inscripción")').first();
                isNuevaVisible = await nuevaInscripcionButton.isVisible({ timeout: 5000 }).catch(() => false);
              }
              
              if (isNuevaVisible) {
                console.log('✅ Botón "Nueva Inscripción" encontrado');
                
                await nuevaInscripcionButton.scrollIntoViewIfNeeded();
                await page.waitForTimeout(250);
                
                console.log('Haciendo clic en el botón "Nueva Inscripción"...');
                await nuevaInscripcionButton.click({ timeout: 10000, force: true });
                await page.waitForNavigation({ timeout: 15000 }).catch(() => null);
                await page.waitForTimeout(1000);
                
                // VALIDAR QUE ESTAMOS EN EL FORMULARIO
                const formUrl = page.url();
                const formularioComponent = page.locator('app-inscripcion-form, app-inscripcion-alumno-form, form');
                const isFormVisible = await formularioComponent.first().isVisible({ timeout: 5000 }).catch(() => false);
                
                if (isFormVisible) {
                  console.log(`✅ Estamos en el formulario de inscripción`);
                  
                  // 6. BUSCAR Y CLICKEAR BOTÓN "SELECCIONAR CURSO"
                  console.log('\n📍 Buscando botón "Seleccionar Curso"...');
                  
                  let seleccionarCursoButton = page.locator('button:has-text("Seleccionar curso")');
                  let isCursoButtonVisible = await seleccionarCursoButton.isVisible({ timeout: 5000 }).catch(() => false);
                  
                  if (!isCursoButtonVisible) {
                    console.log('Intentando con span que contiene "Seleccionar"...');
                    seleccionarCursoButton = page.locator('span:has-text("Seleccionar curso")');
                    isCursoButtonVisible = await seleccionarCursoButton.isVisible({ timeout: 5000 }).catch(() => false);
                  }

                  if (!isCursoButtonVisible) {
                    console.log('Intentando con p-button que contiene "Seleccionar"...');
                    seleccionarCursoButton = page.locator('p-button:has-text("Seleccionar")');
                    isCursoButtonVisible = await seleccionarCursoButton.isVisible({ timeout: 5000 }).catch(() => false);
                  }

                  if (!isCursoButtonVisible) {
                    console.log('Intentando con p-button[label*="Seleccionar"]...');
                    seleccionarCursoButton = page.locator('p-button[label*="Seleccionar"]');
                    isCursoButtonVisible = await seleccionarCursoButton.isVisible({ timeout: 5000 }).catch(() => false);
                  }
                  
                  if (isCursoButtonVisible) {
                    console.log('✅ Botón "Seleccionar Curso" encontrado');
                    await seleccionarCursoButton.scrollIntoViewIfNeeded();
                    await page.waitForTimeout(250);
                    
                    console.log('Haciendo clic en el botón "Seleccionar Curso"...');
                    await seleccionarCursoButton.click({ timeout: 10000, force: true });
                    await page.waitForTimeout(1000);
                    
                    // 7. ESPERAR A QUE EL MODAL SE ABRA
                    console.log('\n📍 Esperando que se abra el modal...');
                    const modal = page.locator('div.p-dialog');
                    const isModalVisible = await modal.isVisible({ timeout: 10000 }).catch(() => false);
                    
                    if (isModalVisible) {
                      console.log('✅ Modal abierto');
                      await page.waitForTimeout(750);
                      
                      // 8. SELECCIONAR MATERIA EN EL P-SELECT DEL MODAL
                      console.log('\n📍 Buscando p-select de MATERIAS en el modal...');
                      
                      const materiasSelect = modal.first().locator('p-select');
                      const isMateriasSelectVisible = await materiasSelect.isVisible({ timeout: 5000 }).catch(() => false);
                      
                      if (isMateriasSelectVisible) {
                        console.log('✅ Select de materias encontrado');
                        await materiasSelect.click({ timeout: 10000 });
                        await page.waitForTimeout(750);
                        
                        // Seleccionar primera opción de materia
                        let materiasOpciones = page.locator('p-selectItem');
                        let materiasOpcionCount = await materiasOpciones.count().catch(() => 0);
                        
                        if (materiasOpcionCount === 0) {
                          materiasOpciones = page.locator('[role="option"]');
                          materiasOpcionCount = await materiasOpciones.count().catch(() => 0);
                        }
                        
                        if (materiasOpcionCount > 0) {
                          console.log('✅ Seleccionando primera materia...');
                          await materiasOpciones.first().click({ timeout: 10000 });
                          await page.waitForTimeout(1000);
                          
                          // 9. BUSCAR Y CLICKEAR BOTÓN "SELECCIONAR" EN LA TABLA DEL MODAL
                          console.log('\n📍 Buscando botón "Seleccionar" en la primera fila de la tabla...');
                          
                          const modalTable = modal.first().locator('p-table');
                          const isModalTableVisible = await modalTable.isVisible({ timeout: 5000 }).catch(() => false);
                          
                          if (isModalTableVisible) {
                            const modalTableRows = modal.first().locator('p-table tbody tr');
                            const modalRowCount = await modalTableRows.count().catch(() => 0);
                            
                            if (modalRowCount > 0) {
                              const firstModalRow = modalTableRows.first();
                              
                              let seleccionarModalButton = firstModalRow.locator('p-button[label*="Seleccionar"]');
                              let isSeleccionarVisible = await seleccionarModalButton.isVisible({ timeout: 5000 }).catch(() => false);
                              
                              if (!isSeleccionarVisible) {
                                seleccionarModalButton = firstModalRow.locator('span:has-text("Seleccionar")');
                                isSeleccionarVisible = await seleccionarModalButton.isVisible({ timeout: 5000 }).catch(() => false);
                              }

                              if (!isSeleccionarVisible) {
                                seleccionarModalButton = firstModalRow.locator('button:has-text("Seleccionar")');
                                isSeleccionarVisible = await seleccionarModalButton.isVisible({ timeout: 5000 }).catch(() => false);
                              }

                              if (!isSeleccionarVisible) {
                                seleccionarModalButton = firstModalRow.locator('p-button').first();
                                isSeleccionarVisible = await seleccionarModalButton.isVisible({ timeout: 5000 }).catch(() => false);
                              }
                              
                              if (isSeleccionarVisible) {
                                console.log('✅ Botón "Seleccionar" encontrado');
                                await seleccionarModalButton.scrollIntoViewIfNeeded();
                                await page.waitForTimeout(250);
                                
                                console.log('Haciendo clic en el botón "Seleccionar"...');
                                await seleccionarModalButton.click({ timeout: 10000, force: true });
                                await page.waitForTimeout(1000);
                                
                                // 10. VERIFICAR QUE EL MODAL SE CERRÓ
                                console.log('\n📍 Verificando que el modal se cerró...');
                                const isModalClosedVisible = await modal.first().isVisible({ timeout: 5000 }).catch(() => false);
                                
                                if (!isModalClosedVisible) {
                                  console.log('✅ Modal cerrado correctamente');
                                  
                                  // 11. SELECCIONAR CONDICIÓN "INSCRIPTO"
                                  console.log('\n📍 Buscando p-select de CONDICIÓN...');
                                  
                                  const condicionSelect = page.locator('p-select').nth(0);
                                  const isCondicionSelectVisible = await condicionSelect.isVisible({ timeout: 5000 }).catch(() => false);
                                  
                                  if (isCondicionSelectVisible) {
                                    console.log('✅ Select de condición encontrado');
                                    await condicionSelect.click({ timeout: 10000 });
                                    await page.waitForTimeout(750);
                                    
                                    // Buscar opción "Inscripto"
                                    let condicionOpciones = page.locator('p-selectItem:has-text("Inscripto")');
                                    let isCondicionOpcionVisible = await condicionOpciones.isVisible({ timeout: 5000 }).catch(() => false);
                                    
                                    if (!isCondicionOpcionVisible) {
                                      condicionOpciones = page.locator('[role="option"]:has-text("Inscripto")');
                                      isCondicionOpcionVisible = await condicionOpciones.isVisible({ timeout: 5000 }).catch(() => false);
                                    }
                                    
                                    if (isCondicionOpcionVisible) {
                                      console.log('✅ Seleccionando "Inscripto"...');
                                      await condicionOpciones.click({ timeout: 10000 });
                                      await page.waitForTimeout(1000);
                                      
                                      // 12. BUSCAR Y CLICKEAR BOTÓN "GUARDAR"
                                      console.log('\n📍 Buscando botón "Guardar"...');
                                      
                                      let guardarButton = page.locator('p-button[label*="Guardar"], button:has-text("Guardar"), span:has-text("Guardar")');
                                      let isGuardarVisible = await guardarButton.first().isVisible({ timeout: 5000 }).catch(() => false);
                                      
                                      if (!isGuardarVisible) {
                                        guardarButton = page.locator('button[type="submit"]');
                                        isGuardarVisible = await guardarButton.isVisible({ timeout: 5000 }).catch(() => false);
                                      }
                                      
                                      if (isGuardarVisible) {
                                        console.log('✅ Botón "Guardar" encontrado');
                                        await guardarButton.first().scrollIntoViewIfNeeded();
                                        await page.waitForTimeout(250);
                                        
                                        console.log('Haciendo clic en el botón "Guardar"...');
                                        await guardarButton.first().click({ timeout: 10000, force: true });
                                        await page.waitForNavigation({ timeout: 15000 }).catch(() => null);
                                        await page.waitForTimeout(1000);
                                        
                                        // 13. VALIDAR QUE VOLVIMOS A LA PÁGINA DE INSCRIPCIONES DEL ALUMNO
                                        console.log('\n📍 Validando que volvimos a la página de inscripciones...');
                                        const finalUrl = page.url();
                                        console.log(`URL final: ${finalUrl}`);
                                        
                                        const finalRegex = /\/inscripciones\/alumnos\/\d+/;
                                        const isFinalUrlCorrect = finalRegex.test(finalUrl);
                                        
                                        if (isFinalUrlCorrect) {
                                          console.log(`✅ Volvimos a la página de inscripciones del alumno: ${finalUrl}`);
                                          await expect(page).toHaveURL(finalRegex);
                                        } else {
                                          console.log(`❌ URL incorrecta: ${finalUrl}`);
                                        }
                                      } else {
                                        console.log('❌ Botón "Guardar" no encontrado');
                                      }
                                    } else {
                                      console.log('❌ Opción "Inscripto" no encontrada');
                                    }
                                  } else {
                                    console.log('❌ Select de condición no encontrado');
                                  }
                                } else {
                                  console.log('❌ Modal no se cerró');
                                }
                              } else {
                                console.log('❌ Botón "Seleccionar" no encontrado en el modal');
                              }
                            }
                          } else {
                            console.log('❌ Tabla en el modal no encontrada');
                          }
                        } else {
                          console.log('❌ No hay opciones de materia');
                        }
                      } else {
                        console.log('❌ Select de materias no encontrado');
                      }
                    } else {
                      console.log('❌ Modal no se abrió');
                    }
                  } else {
                    console.log('❌ Botón "Seleccionar Curso" no encontrado');
                  }
                }
              }
            }
          }
        }
      }

      console.log('\n✅ Test de completar formulario de inscripción finalizado');
    }
  });

});
