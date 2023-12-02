from typing import List, Type

from pydantic import Field
from steamship.agents.functional import FunctionsBasedAgent
from steamship.agents.llms.openai import ChatOpenAI
from steamship.agents.mixins.transports.slack import (
    SlackTransport,
    SlackTransportConfig,
)
from steamship.agents.mixins.transports.steamship_widget import SteamshipWidgetTransport
from steamship.agents.mixins.transports.telegram import (
    TelegramTransport,
    TelegramTransportConfig,
)
from steamship.agents.schema import Tool
from steamship.agents.service.agent_service import AgentService
from steamship.agents.tools.image_generation.stable_diffusion import StableDiffusionTool
from steamship.invocable import Config

DEFAULT_NAME = "Picard"
DEFAULT_BYLINE = "Helpful programming tutor"
DEFAULT_IDENTITY = """- You have a Phd in computing science """
DEFAULT_BEHAVIOR = """- You provide visual explanation of the code or the problem question using markdown
- You do not respond to any other question than visual explanation
- You always sound confident and contemplative.
- You give good explanation of the visual that you produce.
- Visual explanation should include arrows like ->.
- The names and labels used in the visual diagram should have close match to how they would be described in real world.
- If a user asks to check an answer with the question, then you only reply whether the answer is right or wrong.
- The answer of the user must satisfy the conditions of the question for it to be correct.
- All other answers are wrong
"""

SYSTEM_PROMPT = """You are {name}, {byline}.

Who you are:

{identity}

How you behave:

{behavior}

NOTE: Some functions return visual diagrams in markdown. These diagrams will be viewed as markdown.

Example response for a request that generated a visual:
Here is the visual you requested: Node(1) --> Node(2) --> Node(3) --> NULL

Only use the functions you have been provided with."""


class BasicAgentServiceWithPersonality(AgentService):
    """Deployable Multimodal Bot that lets you generate Stable Diffusion images.

    Comes with out of the box support for:
    - Telegram
    - Slack
    - Web Embeds

    """

    USED_MIXIN_CLASSES = [SteamshipWidgetTransport, TelegramTransport, SlackTransport]
    """USED_MIXIN_CLASSES tells Steamship what additional HTTP endpoints to register on your AgentService."""

    class BasicAgentServiceWithPersonalityConfig(Config):
        """Pydantic definition of the user-settable Configuration of this Agent."""

        telegram_bot_token: str = Field(
            "", description="[Optional] Secret token for connecting to Telegram"
        )
        elevenlabs_api_key: str = Field(
            default="", description="[Optional] API KEY for ElevenLabs Voice Bot"
        )
        elevenlabs_voice_id: str = Field(
            default="", description="[Optional] voice_id for ElevenLabs Voice Bot"
        )
        name: str = Field(DEFAULT_NAME, description="The name of your companion")
        byline: str = Field(DEFAULT_BYLINE, description="The byline of your companion")
        identity: str = Field(
            DEFAULT_IDENTITY, description="The identity of your companion"
        )
        behavior: str = Field(
            DEFAULT_BEHAVIOR, description="The behavior of your companion"
        )

    config: BasicAgentServiceWithPersonalityConfig
    """The configuration block that users who create an instance of this agent will provide."""

    tools: List[Tool]
    """The list of Tools that this agent is capable of using."""

    @classmethod
    def config_cls(cls) -> Type[Config]:
        """Return the Configuration class so that Steamship can auto-generate a web UI upon agent creation time."""
        return BasicAgentServiceWithPersonality.BasicAgentServiceWithPersonalityConfig

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        # Tools Setup
        # -----------

        # Tools can return text, audio, video, and images. They can store & retrieve information from vector DBs, and
        # they can be stateful -- using Key-Valued storage and conversation history.
        #
        # See https://docs.steamship.com for a full list of supported Tools.
        # self.tools = [StableDiffusionTool()]
        self.tools = []

        # Agent Setup
        # ---------------------

        # This agent's planner is responsible for making decisions about what to do for a given input.
        agent = FunctionsBasedAgent(
            tools=self.tools,
            llm=ChatOpenAI(self.client, model_name="gpt-4"),
        )

        # Here is where we override the agent's prompt to set its personality. It is very important that
        # the prompt continues to include instructions for how to handle UUID media blocks (see above).
        agent.PROMPT = SYSTEM_PROMPT.format(
            name=self.config.name,
            byline=self.config.byline,
            identity=self.config.identity,
            behavior=self.config.behavior,
        )
        self.set_default_agent(agent)

        # Communication Transport Setup
        # -----------------------------

        # Support Steamship's web client
        self.add_mixin(
            SteamshipWidgetTransport(
                client=self.client,
                agent_service=self,
            )
        )

#        # Support Slack
#        self.add_mixin(
#            SlackTransport(
#                client=self.client,
#                config=SlackTransportConfig(),
#                agent_service=self,
#            )
#        )
#
#        # Support Telegram
#        self.add_mixin(
#            TelegramTransport(
#                client=self.client,
#                config=TelegramTransportConfig(
#                    bot_token=self.config.telegram_bot_token
#                ),
#                agent_service=self,
#            )
#        )
