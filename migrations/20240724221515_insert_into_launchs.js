export function up(knex) {
    const launchData = [];
    for (let year = 2020; year <= 2025; year++) {
        for (let month = 1; month <= 12; month++) {
            for (let i = 0; i < 2; i++) {
                const day = Math.floor(Math.random() * 28) + 1;
                const value = Math.random() * 100;
                const type = i === 0 ? 'debit' : 'credit';
                launchData.push({
                    date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
                    description: 'Breve descrição de uma ação realizada por um usuário.',
                    value: value.toFixed(2),
                    type,
                });
            }
        }
    }
    return knex('launchs').insert(launchData);
}

export function down() {
    return Promise.resolve();
}