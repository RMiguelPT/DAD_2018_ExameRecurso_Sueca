<template>
	<div>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>ID</th>
					<th>Player 1</th>
					<th>Player 2</th>
					<th>Player 3</th>
					<th>Player 4</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="game in games"  :key="game.gameID">
					<td>{{ game.gameID }}</td>
					<td> {{game.players[0].name}}</td>

					<td v-if="game.players[1]"> {{game.players[1].name}}</td>
					<td v-if="!game.players[1]"> Waiting for player 2</td>

					<td v-if="game.players[2]"> {{game.players[2].name}}</td>
					<td v-if="!game.players[2]"> Waiting for player 3</td>

					<td v-if="game.players[3]"> {{game.players[3].name}}</td>
					<td v-if="!game.players[3]"> Waiting for player 4</td>

					<td>
						<a class="btn btn-xs btn-primary" v-on:click.prevent="join(game)">Join</a>
						<a class="btn btn-xs btn-success" v-on:click.prevent="startgame(game)" v-if="game.players[0].playerID == $store.getters.getID">Start</a>
					</td>

				</tr>
			</tbody>
		</table>

	</div>
</template>

<script type="text/javascript">
	module.exports={
		props: ['games'],
        methods: {
            join(game) {
            	this.$emit('join-click', game);
			},	
			startgame(game) {
				console.log("GAME STARTED" + game.gameID);
                this.$emit("start-game", game);
            },	
		},	
		computed: {
			
		}	
	}
</script>

<style scoped>

</style>