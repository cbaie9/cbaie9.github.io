        // Fonction pour récupérer les données de Modrinth
        async function fetchModrinthDownloads() {
            const modrinthUrl = 'https://api.modrinth.com/v2/project/palamod-renew';
            
            try {
                const response = await fetch(modrinthUrl);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                return data.downloads;
            } catch (error) {
                console.error('Erreur lors de la récupération des données Modrinth:', error);
                document.getElementById('modrinth-downloads').className = 'error';
                document.getElementById('modrinth-downloads').textContent = 'Erreur de chargement';
                return 0;
            }
        }

        // Fonction pour récupérer les données de CurseForge
        async function fetchCurseForgeDownloads() {
            // Note: L'API CurseForge nécessite une clé API
            // Ceci est une solution temporaire qui peut ne pas fonctionner à long terme
            const curseforgeUrl = 'https://api.cfwidget.com/minecraft/mc-mods/palamod-renew';
            
            try {
                const response = await fetch(curseforgeUrl);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                return data.downloads.total;
            } catch (error) {
                console.error('Erreur lors de la récupération des données CurseForge:', error);
                document.getElementById('curseforge-downloads').className = 'error';
                document.getElementById('curseforge-downloads').textContent = 'Erreur de chargement';
                return 0;
            }
        }

        // Fonction principale pour afficher les statistiques
        async function displayStats() {
            const modrinthDownloads = await fetchModrinthDownloads();
            const curseforgeDownloads = await fetchCurseForgeDownloads();
            
            // Afficher les résultats individuels
            if (modrinthDownloads > 0) {
                document.getElementById('modrinth-downloads').textContent = modrinthDownloads.toLocaleString() + ' téléchargements';
            }
            
            if (curseforgeDownloads > 0) {
                document.getElementById('curseforge-downloads').textContent = curseforgeDownloads.toLocaleString() + ' téléchargements';
            }
            
            // Calculer et afficher le total
            const totalDownloads = modrinthDownloads + curseforgeDownloads;
            document.getElementById('total-downloads').textContent = totalDownloads.toLocaleString() + ' téléchargements';
        }

        // Lancer le chargement des données lorsque la page est prête
        document.addEventListener('DOMContentLoaded', displayStats);