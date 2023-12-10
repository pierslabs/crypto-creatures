import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class VotesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly votesService: VotesService) {}

  handleConnection(client: Socket) {
    console.log('client connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('client disconnected', client.id);
  }

  @SubscribeMessage('createVote')
  async create(@MessageBody() createVote: CreateVoteDto) {
    const newVote = await this.votesService.create(createVote);
    return this.server.emit('newVote', {
      msg: 'New vote',
      content: newVote,
    });
  }

  @SubscribeMessage('getAllVotes')
  async findAll() {
    const votes = await this.votesService.findAll();
    return this.server.emit('allVotes', {
      msg: 'All votes',
      content: votes,
    });
  }

  @SubscribeMessage('removeVote')
  async remove(@MessageBody() body: { id: string; userId: string }) {
    const remove = await this.votesService.remove(body.id, body.userId);

    return this.server.emit('removeVote', {
      msg: 'Vote removed',
      content: remove,
    });
  }
}
