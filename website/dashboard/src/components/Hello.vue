<template>
  <div>
    <v-toolbar class="transparent elevation-0">
      <v-breadcrumbs icons divider="chevron_right">
        <v-breadcrumbs-item>test</v-breadcrumbs-item>
        <v-breadcrumbs-item>test 2</v-breadcrumbs-item>
        <v-breadcrumbs-item>test 3</v-breadcrumbs-item>
      </v-breadcrumbs>
    </v-toolbar>
    <v-container fluid="fluid" class="ma-3">
      <v-row>
        <v-col xs12 sm6 md4 v-for="i in 7" :key="i">
          <v-card class="mb-3">
            <v-card-row class="green darken-1">
              <v-card-title>
                <span class="white--text">Marriot Rewards</span>
                <v-spacer></v-spacer>
                <div>
                  <v-menu id="marriot" bottom left origin="top right">
                    <v-btn icon="icon" slot="activator" class="white--text">
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-item>
                        <v-list-tile>
                          <v-list-tile-title>Never show rewards</v-list-tile-title>
                        </v-list-tile>
                      </v-list-item>
                      <v-list-item>
                        <v-list-tile>
                          <v-list-tile-title>Remove Card</v-list-tile-title>
                        </v-list-tile>
                      </v-list-item>
                      <v-list-item>
                        <v-list-tile>
                          <v-list-tile-title>Send Feedback</v-list-tile-title>
                        </v-list-tile>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </v-card-title>
            </v-card-row>
            <v-card-text>
              <v-card-row height="75px">
                <v-icon class="mr-5">card_membership</v-icon>
                <div>
                  <div>Membership Number</div><strong>113241423</strong>
                </div>
              </v-card-row>
            </v-card-text>
            <v-card-row actions>
              <v-btn flat class="green--text darken-1">View Email</v-btn>
            </v-card-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'hello'
}
</script>
